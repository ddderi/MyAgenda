import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { changeDone } from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';


type Task = {
    id: string;
    name: string;
    done: boolean;
}


type Props = {
    name: string;
    done: boolean;
    id: string;

}

const Checkbox = (props: Props) => {


    const dispatch = useDispatch()

    const ChangeDone = () => {
        let task: Task = {
            id: props.id,
            name: props.name,
            done: props.done
        }
        dispatch(changeDone(task))
    }
    return (
        <View style={styles.square}>
            {/* <TouchableOpacity style={styles.square} onPress={() => ChangeDone()}  ></TouchableOpacity> */}
            <TouchableOpacity style={!props.done ? styles.done : styles.doneDisplay} ></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 30,
    },
    done: {
        display: 'none',
        // width: 24,
        // height: 24,
        // borderWidth: 4,
        // borderColor: 'transparent',
        // backgroundColor: '#86B049',
        // opacity: 1,
        // borderRadius: 5,
        // marginRight: 15,
    },
    doneDisplay: {
        position: 'absolute',
        top: 2,
        left: 2,
        zIndex: 1,
        width: 20,
        height: 20,
        backgroundColor: '#86B049',
        opacity: 1,
        borderRadius: 5,
        marginRight: 15,
    }

})


export default Checkbox