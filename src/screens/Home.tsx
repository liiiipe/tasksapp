import { useCallback, useEffect, useState } from 'react';
import { Center, FlatList, Heading, HStack, Text, useColorModeValue, useTheme, useToast, VStack, Fab } from "native-base";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ChatTeardropText, Plus } from "phosphor-react-native";

import { Filter } from "../components/Filter";
import { Task as TaskComponent } from '../components/Task';
import { PopoverLengthTasks } from '../components/PopoverLengthTasks';
import { HeaderHome } from '../components/HeaderHome';

import { getAllTasks, removeTask, Task as TaskEntity } from '../entities/task';
import { TaskRepository } from '../repositories/task-repository';
import { AlertError } from '../components/AlertError';

interface HomeProps {
  taskRepository: TaskRepository;
}

export function Home({ taskRepository }: HomeProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const switchColorTextHeader = useColorModeValue("gray.600", "gray.100");
  const toast = useToast();

  const [showError, setShowError] = useState(false);

  const [isTasksFinishedSelected, setIsTasksFinishedSelected] = useState(false);

  const [tasks, setTasks] = useState<TaskEntity[]>([]);

  const tasksFinisheds = tasks.filter(task => task.finished);
  const tasksInProgress = tasks.filter(task => !task.finished);

  function handleNewTask() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  const onClickDeleteTask = async (id: string) => {
    await removeTask(id, taskRepository)
      .then(() => executeAfterRemoveTask(id))
      .catch(errorOnRemoveTask);
  }

  const executeAfterRemoveTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    toast.show({
      title: "Tarefa excluída com sucesso!"
    });
  };

  const errorOnRemoveTask = (error) => {
    console.log("errorOnRemoveTask: ", error);
    setShowError(true);
  };

  useFocusEffect(useCallback(() => {
    let isActive = true;

    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasks(taskRepository);

        if (isActive) {
          setTasks(tasks);
        }
      } catch (error) {
        console.log("errorGetAllTasks: ", error);
        setShowError(true);
      }
    };

    fetchTasks();

    return () => {
      isActive = false;
    };
  }, [tasks]));

  return (
    <VStack flex={1} pb={6} bg={useColorModeValue("gray.200", "gray.700")}>
      <HeaderHome />
      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color={switchColorTextHeader}>Minhas Tarefas</Heading>
          <PopoverLengthTasks
            lengthListTasksSelected={isTasksFinishedSelected ? tasksFinisheds.length : tasksInProgress.length}
            isTasksFinishedSelected={isTasksFinishedSelected}
            colorText={switchColorTextHeader}
          />
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setIsTasksFinishedSelected(false)}
            isActive={!isTasksFinishedSelected}
          />

          <Filter
            type="closed"
            title="finalizadas"
            onPress={() => setIsTasksFinishedSelected(true)}
            isActive={isTasksFinishedSelected}
          />
        </HStack>

        <FlatList
          data={isTasksFinishedSelected ? tasksFinisheds : tasksInProgress}
          keyExtractor={item => item.id}
          renderItem={
            ({ item }) => (
              <TaskComponent
                data={item}
                onPress={() => handleOpenDetails(item.id)}
                onPressDelete={onClickDeleteTask}
              />
            )
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center marginTop={5}>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={4} textAlign="center">
                Você ainda não possui {'\n'}
                tarefas {isTasksFinishedSelected ? 'finalizadas' : 'em andamento'}
              </Text>
            </Center>
          )}
        />

      </VStack>

      <Fab
        renderInPortal={false}
        shadow={2}
        icon={<Plus color={colors.white} size={30} />}
        bg="green.300"
        onPress={() => handleNewTask()}
      />

      <AlertError show={showError} setShow={setShowError} />
    </VStack>
  )
}