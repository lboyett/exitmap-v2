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
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import FileInput from "./file-input/FileInput";

export default function SubmitExitForm() {
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";

  return (
    <form className="submit-exit-form">
      <FormControl>
        <FormLabel>Exit Name</FormLabel>
        <Input type="text" isRequired className={inputColorMode} />
      </FormControl>
      <FileInput />
      <FormControl>
        <FormLabel>Type of Object</FormLabel>
        <Select placeholder="Select type" isRequired className={inputColorMode}>
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
      <FormControl>
        <FormLabel>Experience Required</FormLabel>
        <Select
          placeholder="Select experience level"
          isRequired
          className={inputColorMode}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>Expert</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Legality</FormLabel>
        <Select
          placeholder="Select legality"
          isRequired
          className={inputColorMode}
        >
          <option>Legal</option>
          <option>Semi-legal</option>
          <option>Illegal</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Bust Factor</FormLabel>
        <input
          type="range"
          min={0}
          max={1}
          defaultValue={0.5}
          step={0.5}
          className="input-slider input"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Height Until Impact</FormLabel>
        <Input type="number" isRequired className={inputColorMode} />
      </FormControl>
      <FormControl>
        <FormLabel>Height Until Landing</FormLabel>
        <Input type="number" isRequired className={inputColorMode} />
      </FormControl>
      <FormControl>
        <FormLabel>Latitude</FormLabel>
        <Input type="number" isRequired className={inputColorMode} />
        <FormHelperText>click map to add location</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Longitude</FormLabel>
        <Input type="number" isRequired className={inputColorMode} />
      </FormControl>
      <FormControl>
        <FormLabel>Hiking Time</FormLabel>
        <Input type="number" isRequired className={inputColorMode} />
      </FormControl>
      <FormControl>
        <FormLabel>Approach Difficulty</FormLabel>
        <input
          type="range"
          min={0}
          max={1}
          defaultValue={0.5}
          step={0.5}
          className="input-slider input"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea resize="none" isRequired className={inputColorMode} />
      </FormControl>
      <FormControl>
        <FormLabel>Access and Approach</FormLabel>
        <Textarea resize="none" isRequired className={inputColorMode} />
      </FormControl>
      <FormControl>
        <FormLabel>Landing Area</FormLabel>
        <Textarea resize="none" isRequired className={inputColorMode} />
      </FormControl>
    </form>
  );
}
