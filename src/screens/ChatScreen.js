import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  const renderSend = props => (
    <Send {...props}>
      <View style={styles.sendContainer}>
        <Icon name="send" size={24} color="#0066FF" />
      </View>
    </Send>
  );

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#0066FF',
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
        },
      }}
    />
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        placeholder="Type your message here..."
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        alwaysShowSend={true}
        renderBubble={renderBubble}
        renderSend={renderSend}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingBottom: 100,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;
