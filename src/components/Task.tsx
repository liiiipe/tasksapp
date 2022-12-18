import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps, useColorModeValue } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

export type TaskProps = {
  id: string;
  title: string;
  when: string;
  finished: boolean;
}

type Props = IPressableProps & {
  data: TaskProps;
}

export function Task({ data, ...rest }: Props) {
  const { colors } = useTheme();

  const statusColor = data.finished ? colors.green[300] : colors.secondary[700];

  return (
    <Pressable
      borderWidth={1}
      borderColor={useColorModeValue("gray.700", "gray.200")}
      rounded="md"
      _pressed={{ borderColor: useColorModeValue(statusColor, "white") }}
      mb={4}
      {...rest}
    >
      <HStack
        bg="gray.600"
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
           {data.title}
          </Text>
          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {
            data.finished
              ? <CircleWavyCheck size={24} color={statusColor} />
              : <Hourglass size={24} color={statusColor} />
          }
        </Circle>
      </HStack>
    </Pressable>
  );
}