import "./submit-exit-form.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export default function SubmitExitForm() {
  return (
    <form className="submit-exit-form">
      <FormControl>
        <FormLabel>Exit Name</FormLabel>
        <Input type="text" />
      </FormControl>
    </form>
  );
}
