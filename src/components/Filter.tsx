import { Text, Button, IButtonProps, useTheme, useColorModeValue } from 'native-base';

type Props = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed';
}

export function Filter({ title, isActive = false, type, ...rest }: Props) {
  const { colors } = useTheme();

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300];

  return (
    <Button
      variant="outline"
      borderWidth={1}
      borderColor={useColorModeValue(isActive ? colorType : "gray.600", isActive ? "white" : "gray.300")}
      bgColor={useColorModeValue("gray.600", isActive ? colorType : "gray.300")}
      flex={1}
      size="sm"
      _pressed={{ bg: colorType, borderColor: useColorModeValue(colorType, "white") }}
      disabled={isActive}
      {...rest}
    >
      <Text 
      color={useColorModeValue(isActive ? colorType : "gray.300", "white")} 
      fontSize="xs" 
      textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
}