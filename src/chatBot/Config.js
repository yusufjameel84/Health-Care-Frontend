// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import DoctorWidget from "./DoctorWidget";

const config = {
  initialMessages: [createChatBotMessage(`Type Hey Doctor`)],
  botName: "MedicalBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    }
  },
  state: {
      name: "",
      phone: "",
      doctorAvaiable: []
  },
  widgets: [
    {
        widgetName: "doctors",
        widgetFunc: (props) => <DoctorWidget {...props} />,
        mapStateToProps: ["doctors"],
        props: {}
    }
  ]
}

export default config