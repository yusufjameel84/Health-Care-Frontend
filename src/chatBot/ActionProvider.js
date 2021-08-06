// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      this.name = ""
    }

    handleHeyDoctor = () => {
      const message = this.createChatBotMessage("What is your name? Happy to help!!😊 ")
      this.setChatBotMessageHandler(message)

    } 

    handleName = () => {
      if (typeof window === undefined) {
          return false;
      }
      if (localStorage.getItem('name')) {
          return JSON.parse(localStorage.getItem('name'));
      } else {
          return false;
      }
    }

    handleNameState = (name) => {
      const nameTest = this.handleName();

      if(nameTest === false) {
          this.setState(state => ({...state, name: name}));
          this.name = name;
          localStorage.setItem('name', JSON.stringify(name));
        } else {
          this.name = nameTest
          this.setState(state => ({...state, name: name}));
        }
    }

    handleNameMessage = () => {
      const message = this.createChatBotMessage(`${this.name}!😊 You can get all Available doctors by typing doctors`)
      this.setChatBotMessageHandler(message)
    }

    handleDoctorAppointment = () => {
      // test : - data 
      const message = this.createChatBotMessage("Hi Here's your list", { widget: "doctors" })
      this.setChatBotMessageHandler(message)
    }

    handleDoctor = (doctors) => {
      this.setState(state => ({...state, doctorAvaiable: doctors}))
    }

    handleErrorMessage = () => {
      const message = this.createChatBotMessage("Sorry I didn't get you, To solve your query Please Call: 9899991016 Happy to help!!😊 ")
      this.setChatBotMessageHandler(message)
    }

    setChatBotMessageHandler = (message) => {
      this.setState(state => ({...state, messages: [...state.messages, message]}))
    }
  }
  
  export default ActionProvider;