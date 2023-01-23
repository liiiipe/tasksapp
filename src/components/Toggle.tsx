import { HStack, Pressable, Switch, Text, useTheme } from "native-base";

interface ToggleProps {
  handleToggleFinished: (isFinished?: boolean) => void;
  switchValue: boolean;
}

export function Toggle({handleToggleFinished, switchValue}: ToggleProps) {
  const { colors } = useTheme();

  return (
    <HStack alignItems="center" space={4}>
      <Pressable
        onPress={() => handleToggleFinished(false)}
        _pressed={{
          opacity: 0.3
        }}
      >
        <Text color={colors.secondary[700]}>Em andamento</Text>
      </Pressable>
      <Switch
        size="lg"
        onTrackColor={colors.primary[700]}
        offTrackColor={colors.secondary[700]}
        onToggle={() => handleToggleFinished()}
        isChecked={switchValue}
      />
      <Pressable
        onPress={() => handleToggleFinished(true)}
        _pressed={{
          opacity: 0.3
        }}
      >
        <Text color={colors.primary[700]}>Finalizada</Text>
      </Pressable>
    </HStack>
  )
}