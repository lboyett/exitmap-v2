import "./submit-exit-form.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";

export default function SubmitExitForm() {
  return (
    <form className="submit-exit-form">
      <FormControl isRequired>
        <FormLabel>Exit Name</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Type of Object</FormLabel>
        <Select placeholder="Select type">
          <option>Building</option>
          <option>Antenna</option>
          <option>Span</option>
          <option>Earth</option>
          <option>Other</option>
        </Select>
      </FormControl>
      <CheckboxGroup>
        <Stack direction={"row"}>
          <Checkbox value="slider_down">Slider down</Checkbox>
          <Checkbox value="slider_up_slick">Slider up slick</Checkbox>
          <Checkbox value="two_piece">Two piece</Checkbox>
          <Checkbox value="one_piece">One piece</Checkbox>
          <Checkbox value="wingsuit">Wingsuit</Checkbox>
        </Stack>
      </CheckboxGroup>
      <FormControl isRequired>
        <FormLabel>Experience Required</FormLabel>
        <Select placeholder="Select experience level">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>Expert</option>
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Legality</FormLabel>
        <Select placeholder="Select legality">
          <option>Legal</option>
          <option>Semi-legal</option>
          <option>Illegal</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Bust Factor</FormLabel>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Height Until Impact</FormLabel>
        <Input type="number" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Height Until Landing</FormLabel>
        <Input type="number" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Latitude</FormLabel>
        <Input type="number" />
        <FormHelperText>click map to add location</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Longitude</FormLabel>
        <Input type="number" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Hiking Time</FormLabel>
        <Input type="number" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Approach Difficulty</FormLabel>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea resize="none" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Access and Approach</FormLabel>
        <Textarea resize="none" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Landing Area</FormLabel>
        <Textarea resize="none" />
      </FormControl>
    </form>
  );
}
