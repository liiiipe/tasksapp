import { Circle, Popover, Pressable, Text } from "native-base";

type PopoverLengthTasksProps = {
  lengthListTasksSelected: number;
  isTasksFinishedSelected: boolean;
  colorText: string;
}

export function PopoverLengthTasks({ lengthListTasksSelected, isTasksFinishedSelected, colorText }: PopoverLengthTasksProps) {
  let singularOrPluralSentence = lengthListTasksSelected === 1 ? `tarefa ${isTasksFinishedSelected ? "finalizada" : "em andamento"}` : `tarefas ${isTasksFinishedSelected ? "finalizadas" : "em andamento"}`;

  return (
    <Popover trigger={triggerProps => {
      return (
        <Pressable
          _pressed={{ opacity: "0.3" }}
          {...triggerProps}
        >
          <Circle
            h={8}
            w={8}
            borderWidth={1}
            borderColor={colorText}
          >
            <Text color={colorText} >
              {lengthListTasksSelected}
            </Text>
          </Circle>
        </Pressable>
      );
    }}>
      <Popover.Content accessibilityLabel="Quantidade de tarefas por lista selecionada" w="xs">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>
          <Text>
            Você tem {lengthListTasksSelected} {singularOrPluralSentence}
          </Text>
        </Popover.Header>
      </Popover.Content>
    </Popover>
  )
}