import { useState } from 'react';
import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps, useColorModeValue, View, Button } from 'native-base';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClockAfternoon, Hourglass, CircleWavyCheck, Trash } from 'phosphor-react-native';

import { Task as TaskEntity } from '../entities/task';

type TaskProps = IPressableProps & {
  data: TaskEntity;
  onPressDelete: (id: string) => Promise<void>;
}

export function Task({ data, onPressDelete, ...rest }: TaskProps) {
  const { colors } = useTheme();

  const statusColor = data.finished ? colors.green[300] : colors.secondary[700];
  const dateFormat = `${data.date.toLocaleDateString()} às ${data.date.toLocaleTimeString().substring(0, 5)}`;
  const IconFineshed = data.finished ? CircleWavyCheck : Hourglass;

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => <RenderRightActionsTask onPressDelete={onPressDelete} idTask={data.id} />}
      >
        <Pressable
          borderWidth={1}
          borderColor={useColorModeValue(colors.gray[200], colors.gray[700])}
          rounded="md"
          _pressed={{ borderColor: useColorModeValue(colors.white, statusColor) }}
          mb={4}
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
    </GestureHandlerRootView>
  );
}

type renderRightActionsTaskProps = {
  onPressDelete: (id: string) => Promise<void>;
  idTask: string;
}

const RenderRightActionsTask = ({ onPressDelete, idTask }: renderRightActionsTaskProps) => {
  const [loading, setLoading] = useState(false);

  const handlePressDelete = async () => {
    setLoading(true);
    await onPressDelete(idTask);
    setLoading(false);
  };

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