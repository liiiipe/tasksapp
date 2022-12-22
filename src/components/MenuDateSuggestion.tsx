import { Button, HStack, Menu, Text } from "native-base";
import { CalendarCheck, Timer } from "phosphor-react-native";

interface MenuDateSuggestionProps {
  title: string;
  type: "date" | "time";
  onPressMenuItem: (suggestion: Date) => void;
}

export function MenuDateSuggestion({ title, type, onPressMenuItem }: MenuDateSuggestionProps) {
  const suggestionDateType = [
    {
      label: "Hoje",
      value: new Date()
    },
    {
      label: "Amanhã",
      value: new Date()
    },
    {
      label: "Daqui a 2 dias",
      value: new Date()
    },
    {
      label: "Daqui a 3 dias",
      value: new Date()
    },
    {
      label: "Daqui a 7 dias",
      value: new Date()
    },
  ]

  const suggestionTimeType = [
    {
      label: "8 da manhã",
      value: new Date()
    },
    {
      label: "10 da manhã",
      value: new Date()
    },
    {
      label: "Meio dia",
      value: new Date()
    },
    {
      label: "2 da tarde",
      value: new Date()
    },
    {
      label: "4 da tarde",
      value: new Date()
    },
  ]

  const Icon = type === "date" ? CalendarCheck : Timer;
  const items = type === "date" ? suggestionDateType : suggestionTimeType;

  return (
    <Menu
      trigger={triggerProps =>
        <Button p={2} mt={4} bg="gray.400" rounded={10} accessibilityLabel="date suggestion menu" {...triggerProps}>
          <HStack alignItems="center" space={2}>
            <Icon size={22} color="white" />
            <Text fontSize="sm" color="white">{title}</Text>
          </HStack>
        </Button>
      }
    >
      {
        items.map(({ label, value }) => <Menu.Item key={label} onPress={() => onPressMenuItem(value)}>{label}</Menu.Item>)
      }
    </Menu>
  )
}