import { useState } from 'react';
import { Center, FlatList, Heading, HStack, IconButton, Text, useColorMode, useColorModeValue, useTheme, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { ChatTeardropText, Moon, Plus, SunDim } from "phosphor-react-native";

import { Filter } from "../components/Filter";
import { Task as TaskComponent}  from '../components/Task';
import { PopoverLengthTasks } from '../components/PopoverLengthTasks';
import { Task as TaskEntity } from '../entities/task';
import { HeaderHome } from '../components/HeaderHome';

export function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const switchColorTextHeader = useColorModeValue("gray.600", "gray.100");

  const [isTasksFinishedSelected, setIsTasksFinishedSelected] = useState(false);

  const [tasks, setTasks] = useState<TaskEntity[]>([
    {
      id: '456',
      title: 'Task 123456766767',
      date: new Date('2022-12-23T09:30:44.244Z'),
      finished: false,
      description: "",
    },
    {
      id: '454356',
      title: 'Task finalizada',
      date: new Date('2022-12-23T09:30:44.244Z'),
      finished: true,
      description: "",
    }
  ]);

  const tasksFinisheds = tasks.filter(task => task.finished);
  const tasksInProgress = tasks.filter(task => !task.finished);

  function handleNewTask() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg={useColorModeValue("gray.200", "gray.700")} position="relative">
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
          renderItem={({ item }) => <TaskComponent data={item} onPress={() => handleOpenDetails(item.id)} />}
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

      <IconButton
        position="absolute"
        bottom={6}
        right={6}
        borderRadius="full"
        bg="green.300"
        variant="ghost"
        width={"16"}
        icon={<Plus color={colors.white} size={42} />}
        onPress={() => handleNewTask()}
      />
    </VStack>
  )
}