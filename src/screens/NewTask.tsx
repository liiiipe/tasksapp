import { useState } from 'react';
import { HStack, Text, VStack, Switch, useTheme, Pressable, FormControl, WarningOutlineIcon, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { createTask, Task } from '../entities/task';
import { TaskRepository } from '../repositories/task-repository';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AlertError } from '../components/AlertError';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ButtonDatePicker } from '../components/ButtonDatePicker';
import { MenuDateSuggestion } from '../components/MenuDateSuggestion';

interface NewTaskProps {
  taskRepository: TaskRepository;
}

export function NewTask({ taskRepository }: NewTaskProps) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  const [isInvalid, setIsInvalid] = useState(false);
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    date: new Date(),
    finished: false
  });

  const [showError, setShowError] = useState(false);

  const handleToggleFinished = (isFinished?: boolean) => {
    setTask({ ...task, finished: isFinished !== undefined ? isFinished : !task.finished });
  }

  const executeAfterCreateTask = () => {
    toast.show({
      title: "Tarefa criada com sucesso!"
    });

    navigation.goBack();
  };

  const errorOnCreateTask = (error) => {
    console.log("errorOnCreateTask: ", error);
    setShowError(true);
  };

  const handleCreateTask = async () => {
    if (task.title.trim() === "") {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);

    await createTask(task, taskRepository)
      .then(executeAfterCreateTask)
      .catch(errorOnCreateTask);
  }

  const handleChangeDateTime = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setTask({ ...task, date: currentDate });
  };

  const showMode = (mode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: task.date,
      onChange: handleChangeDateTime,
      mode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const updatingDateBasedOnSuggestion = (suggestion: Date) => {
    console.log(suggestion);
    
  }

  return (
    <VStack flex={1} p={6} bg={colors.gray[600]}>
      <FormControl flex={1} isInvalid={isInvalid}>
        <Header title="Nova Tarefa" />

        <Input
          placeholder="Título da tarefa"
          mt={4}
          value={task.title}
          onChangeText={(value) => setTask({ ...task, title: value })}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          O título da tarefa não pode ser vazio.
        </FormControl.ErrorMessage>

        <HStack justifyContent="space-between">
          <ButtonDatePicker type="date" onPress={showDatepicker} date={task.date} />
          <ButtonDatePicker type="time" onPress={showTimepicker} date={task.date} />
        </HStack>

        <HStack justifyContent="space-between">
          <MenuDateSuggestion title="Sugestão de Data" type="date" onPressMenuItem={updatingDateBasedOnSuggestion}/>
          <MenuDateSuggestion title="Sugestão de Horário" type="time" onPressMenuItem={updatingDateBasedOnSuggestion}/>
        </HStack>

        <Input
          placeholder="Descrição da tarefa"
          flex={1}
          mt={5}
          multiline
          textAlignVertical="top"
          onChangeText={(value) => setTask({ ...task, description: value })}
        />

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
            isChecked={task.finished}
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
        <Button
          title="Cadastrar"
          mt={1}
          onPress={handleCreateTask}
        />
      </FormControl>
      <AlertError show={showError} setShow={setShowError} />
    </VStack>
  );
}