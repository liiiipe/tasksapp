import { Text, Button, IButtonProps, useTheme, useColorModeValue } from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';

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
      borderColor={useColorModeValue(isActive ? colors.white : colors.gray[300], isActive ? colorType : colors.gray[600])}
      bgColor={useColorModeValue(isActive ? colorType : colors.gray[300], colors.gray[600])}
      flex={1}
      size="sm"
      _pressed={{ bg: colorType, borderColor: useColorModeValue(colors.white, colorType) }}
      disabled={isActive}
      {...rest}
    >
      <Text 
      color={useColorModeValue(colors.white, isActive ? colorType : colors.gray[300])} 
      fontSize="xs" 
      textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
}