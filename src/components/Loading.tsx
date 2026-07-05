import { 
     StyleSheet, 
     Text, 
     View, 
     ActivityIndicator
} from 'react-native'



export default function Loading(){
    return(
        <View style={styles.Container}>
            <ActivityIndicator 
            color={"#000"}
            size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})