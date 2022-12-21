import { HStack, Button, Text, IButtonProps } from "native-base";
import { Calendar, Timer } from "phosphor-react-native";

interface ButtonDatePickerProps extends IButtonProps {
  type: "date" | "time"
}

export function ButtonDatePicker({ type, ...rest }: ButtonDatePickerProps) {
  const Icon = type === "date" ? Calendar : Timer;
  const text = type === "date" ? "Data" : "Horário";

  return (
    <Button p={2} mt={4} bg="gray.400" rounded={10} {...rest}>
      <HStack alignItems="center" space={2}>
        <Icon size={32} color="white" />
        <Text fontSize="md" color="white">{text}</Text>
      </HStack>
    </Button>
  )
}