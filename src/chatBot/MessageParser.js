// MessageParser starter code

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }

    parse(message) {
      console.log(this.state)
      const messageFromUser = message.toLowerCase()

      if (messageFromUser.includes("hey doctor")) {
          this.actionProvider.handleHeyDoctor()
          return
      }

      if (this.state.name === "") {
          this.actionProvider.handleNameState(message)
          this.actionProvider.handleNameMessage()
          return
      }

      if (messageFromUser.includes("doctor")) {
          this.actionProvider.handleDoctorAppointment()
          return
      }

      this.actionProvider.handleErrorMessage()
    }
  }
  
  export default MessageParser;