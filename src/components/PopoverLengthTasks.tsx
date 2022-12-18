import { Circle, Popover, Pressable, Text } from "native-base";

type PopoverLengthTasksProps = {
  lengthListTasksSelected: number;
  isTasksFinishedSelected: boolean;
  switchColorTextTitle: string;
}

export function PopoverLengthTasks({ lengthListTasksSelected, isTasksFinishedSelected, switchColorTextTitle }: PopoverLengthTasksProps) {
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
            borderColor={isTasksFinishedSelected ? "green.300" : "secondary.700"}
          >
            <Text color={switchColorTextTitle} >
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