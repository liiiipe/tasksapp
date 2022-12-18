import { useState } from 'react';

import { Center, Circle, FlatList, Heading, HStack, IconButton, Popover, Text, useColorMode, useColorModeValue, useTheme, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { ChatTeardropText, Moon, Plus, SunDim } from "phosphor-react-native";

import { Filter } from "../components/Filter";
import { Task, TaskProps } from '../components/Task';
import Logo from "../assets/logo_secondary.svg";
import { PopoverLengthTasks } from '../components/PopoverLengthTasks';

export function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const switchColorTextHeader = useColorModeValue("gray.100", "gray.600");

  const [isTasksFinishedSelected, setIsTasksFinishedSelected] = useState(false);

  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: '456',
      title: 'Task 123456766767',
      when: '18/07/2022 às 14:00',
      finished: false
    },
    {
      id: '454356',
      title: 'Task finalizada',
      when: '18/07/2022 às 14:00',
      finished: true
    }
  ]);

  let tasksFinisheds = tasks.filter(task => task.finished);
  let tasksInProgress = tasks.filter(task => !task.finished);

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg={useColorModeValue("gray.700", "gray.200")} position="relative">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg={useColorModeValue("gray.600", "gray.400")}
        pt={12}
        py={2}
        px={6}
      >
        <Logo />
        <IconButton
          onPress={toggleColorMode}
          icon={
            colorMode !== 'light' ?
              <Moon size={26} color={colors.gray[300]} />
              :
              <SunDim size={26} color={colors.gray[300]} />
          }
        />
      </HStack>
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
          renderItem={({ item }) => <Task data={item} onPress={() => handleOpenDetails(item.id)} />}
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
        icon={<Plus color={colors.white} size={40} />}
        onPress={() => handleNewOrder()}
      />
    </VStack>
  )
}