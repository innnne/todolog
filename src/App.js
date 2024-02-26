import React, {useState, useEffect} from 'react';
import {StatusBar, Switch, View, Text} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {theme, darkTheme} from './Theme';
import {Wrapper, Header, Container, Tit, ListArea} from './Style';
import {TaskInput} from './components/Input';
import {Task} from './components/Task';

const App = () => {
    // 
    const [isReady, setIsReady] = useState(false);
    const [isDark, setDark] = useState(false);

    const [newTask, setnewTask] = useState('');
    const [tasks, setTasks] = useState({});
    
    const _clearTasks = async () => {
        try{
            await AsyncStorage.clear();
        }catch(e){
            console.error(e);
        }
    };
    
    // data save 
    const _saveData = async tasks => {
        try {
            _clearTasks();
            await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
            setTasks(tasks);
        } catch(e){
            console.error(e);
        }
    };
 
    useEffect(()=>{
        const _loadData = async () => {
            try {
                const loadedData = await AsyncStorage.getItem('tasks');
                setTasks(JSON.parse(loadedData || '{}'));
            } catch(e){
                console.error(e);
            } finally{
                setIsReady(true);
            }
        };
        _loadData();
    }, []); // 빈 배열 전달해 컴포넌트가 처음 렌더링 될때만 실행

    // todo addTask
    const _addTask = () => {
        const Id = Date.now().toString();
        const newTaskObj = {
            [Id] : { id : Id, text : newTask, completed : false},
        };
        setnewTask('');
        _saveData({...tasks, ...newTaskObj});
    };
    // todo delete
    const _delTask = id => {
        const currTasks = Object.assign({}, tasks); 
        delete currTasks[id];
        _saveData(currTasks);
    };
    // todo completed
    const _chkTask = id => {
        const currTasks = Object.assign({}, tasks);
        currTasks[id]['completed'] = !currTasks[id]['completed'];
        _saveData(currTasks);
    };

    const _updateTask = el => {
        const currTasks = Object.assign({}, tasks);
        currTasks[el.id] = el;
        _saveData(currTasks);
    };

    return isReady ? (
        <ThemeProvider theme={isDark ? darkTheme : theme} >
            <StatusBar barStyle={isDark ? 'light-contents' : 'dark-content'} backgroundColor={isDark ? darkTheme.background : theme.background} />
            <Wrapper>
                <Header>
                    <Switch value={isDark} onValueChange={()=>setDark(!isDark)} />
                </Header>
                <Container>
                    <View style={{paddingHorizontal:20, paddingVertical:10}}>
                        <Tit>해야할 일을{'\n'}추가해주세요</Tit>
                        <TaskInput
                            placeholder='Enter a Text..'
                            value={newTask}
                            onChangeText={(text)=>setnewTask(text)}
                            onSubmitEditing={_addTask}
                            onBlur={()=>setnewTask('')}
                        />
                    </View>
                    <ListArea contentContainerStyle={{ paddingBottom: 100 }}>
                        {Object.values(tasks)
                            .reverse()
                            .map((el, idx)=>(
                            <Task
                                key={el.id} el={el}
                                deleteTask={_delTask}
                                chkTask={_chkTask}
                                updateTask={_updateTask}
                            />
                        ))}
                    </ListArea>
                </Container>
            </Wrapper>
        </ThemeProvider>
    ) : (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Loading...</Text>
        </View>
    );
};

export default App;