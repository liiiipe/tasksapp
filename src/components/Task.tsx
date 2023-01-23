import { useState } from 'react';
import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps, useColorModeValue, View, Button, Actionsheet, useDisclose } from 'native-base';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClockAfternoon, Hourglass, CircleWavyCheck, Trash, Calendar, Clock } from 'phosphor-react-native';

import { Task as TaskEntity } from '../entities/task';
import { Toggle } from './Toggle';
import { Loading } from './Loading';

type TaskProps = IPressableProps & {
  data: TaskEntity;
  onPressDelete: (id: string) => Promise<void>;
  onPressFinishTask: (id: string, isFinished: boolean) => Promise<void>
}

export function Task({ data, onPressDelete, onPressFinishTask, ...rest }: TaskProps) {
  const { colors } = useTheme();

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();


  const statusColor = data.finished ? colors.green[300] : colors.secondary[700];
  const dateFormat = `${data.date.toLocaleDateString()} às ${data.date.toLocaleTimeString().substring(0, 5)}`;
  const IconFineshed = data.finished ? CircleWavyCheck : Hourglass;

  const handleToggleFinished = (isFinished?: boolean) => {
    onPressFinishTask(data._id, isFinished !== undefined ? isFinished : !data.finished);
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => <ButtonDelete onPressDelete={onPressDelete} idTask={data._id} />}
      >
        <Pressable
          borderWidth={1}
          borderColor={useColorModeValue(colors.gray[200], colors.gray[700])}
          rounded="md"
          _pressed={{ borderColor: useColorModeValue(colors.white, statusColor) }}
          mb={4}
          onPress={onOpen}
          {...rest}
        >
          <HStack
            bg={colors.gray[600]}
            alignItems="center"
            justifyContent="space-between"
            rounded="sm"
            overflow="hidden"
          >
            <Box h="full" w={2} bg={statusColor} />

            <VStack flex={1} my={5} ml={5}>
              <Text color={colors.white} fontSize="md">
                {data.title}
              </Text>
              <HStack alignItems="center">
                <ClockAfternoon size={15} color={colors.gray[300]} />
                <Text color={colors.gray[200]} fontSize="xs" ml={1}>
                  {dateFormat}
                </Text>
              </HStack>
            </VStack>

            <Circle bg={colors.gray[500]} h={12} w={12} mr={5}>
              <IconFineshed size={24} color={statusColor} />
            </Circle>
          </HStack>
        </Pressable>
      </Swipeable>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack w="full" px={4} space={4} alignItems="center">
            <View w="full">
              <Text mx="auto" w="64" textAlign="center" fontWeight="bold" fontSize="xl">{data.title}</Text>
              <View position="absolute" right={0}>
                <ButtonDelete onPressDelete={onPressDelete} idTask={data._id} compact />
              </View>
            </View>
            <Text>{data.description}</Text>
            <HStack justifyContent="space-between" w="full" p={2} bg="gray.400" rounded={10}>
              <HStack alignItems="center" space={2}>
                <Calendar size={32} color="white" />
                <Text fontSize="md" color="white">
                  Data
                  <Text fontSize="sm" color="white">: {new Date(data.date).toLocaleDateString()}</Text>
                </Text>
              </HStack>

              <HStack alignItems="center" space={2}>
                <Clock size={32} color="white" />
                <Text fontSize="md" color="white">
                  Horário
                  <Text fontSize="sm" color="white">: {new Date(data.date).toLocaleTimeString().substring(0, 6)}00</Text>
                </Text>
              </HStack>
            </HStack>
            <Toggle
              handleToggleFinished={handleToggleFinished}
              switchValue={data.finished}
            />
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </GestureHandlerRootView>
  );
}

type buttonDeleteProps = {
  onPressDelete: (id: string) => Promise<void>;
  idTask: string;
  compact?: boolean;
}

const ButtonDelete = ({ onPressDelete, idTask, compact }: buttonDeleteProps) => {
  const [loading, setLoading] = useState(false);

  const handlePressDelete = async () => {
    setLoading(true);
    await onPressDelete(idTask);
    setLoading(false);
  };

  if (compact) {
    return (
      <View width="12" height="12">
        <Button
          leftIcon={<Trash size={24} color="white" />}
          isLoading={loading}
          bg="red.600"
          w="full"
          h="full"
          rounded="md"
          onPress={handlePressDelete}
        />
      </View>
    )
  }

  return (
    <View width={100} height={88}>
      <Button
        leftIcon={<Trash size={24} color="white" />}
        isLoading={loading}
        bg="red.600"
        w="full"
        h="full"
        rounded="md"
        onPress={handlePressDelete}
      >
        Excluir
      </Button>
    </View>
  );
};