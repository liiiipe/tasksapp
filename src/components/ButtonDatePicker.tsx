import { HStack, Button, Text, IButtonProps, VStack } from "native-base";
import { Calendar, Clock } from "phosphor-react-native";

interface ButtonDatePickerProps extends IButtonProps {
  type: "date" | "time";
  date: Date;
}

export function ButtonDatePicker({ type, date, ...rest }: ButtonDatePickerProps) {
  const Icon = type === "date" ? Calendar : Clock;
  const text = type === "date" ? "Data" : "Horário";
  const dateFormat = type === "date" ? date.toLocaleDateString() : `${date.toLocaleTimeString().substring(0, 6)}00`;

  return (
    <Button p={2} mt={4} bg="gray.400" rounded={10} {...rest}>
      <HStack alignItems="center" space={2}>
        <Icon size={32} color="white" />
        <Text fontSize="md" color="white">
          {text}
          <Text fontSize="sm" color="white">: {dateFormat}</Text>
        </Text>
      </HStack>
    </Button>
  )
}