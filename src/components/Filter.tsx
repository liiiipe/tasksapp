import { Text, Button, IButtonProps, useTheme } from 'native-base';

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
      borderColor={isActive ? colorType : "gray.600"}
      bgColor="gray.600"
      flex={1}
      size="sm"
      _pressed={{ bg: colorType }}
      disabled={isActive}
      {...rest}
    >
      <Text color={isActive ? colorType : "gray.300"} fontSize="xs" textTransform="uppercase">
        {title}
      </Text>
    </Button>
  );
}