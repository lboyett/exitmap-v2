import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import "./file-input.css";

interface FileInputProps {
  updateForm: Function;
}

export default function FileInput({ updateForm }: FileInputProps) {
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState<FormData>();
  const [borderColor, setBorderColor] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);

  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const lightMode = useColorModeValue(true, false);
  const inputMode = lightMode ? "input-light" : "input-dark";

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setBorderColor(undefined);
    setFileName(e.dataTransfer.files[0].name);
    const formData = new FormData();
    formData.append("file", e.dataTransfer.files[0]);
    setFormData(formData);
  }

  useEffect(() => {
    updateForm(formData);
  }, [formData]);

  return (
    <FormControl>
      <FormLabel>Upload Image</FormLabel>
      <Input
        type="file"
        ref={fileInput}
        display="none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return; // add error message here
          setFileName(e.target.files[0].name);
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          setFormData(formData);
        }}
      />
      <Input
        as="div"
        className={`input-div ${inputMode}`}
        color={borderColor}
        boxShadow="0px 0px 5px"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => {
          setBorderColor(txt_500);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragExit={() => {
          setBorderColor(undefined);
        }}
        onDragLeave={() => {
          setBorderColor(undefined);
        }}
      >
        <Box>{fileName}</Box>
        <Button
          type={"button"}
          onClick={() => {
            if (fileInput.current) fileInput.current.click();
          }}
        >
          Choose File
        </Button>
      </Input>

      <FormHelperText>drag and drop an image file</FormHelperText>
    </FormControl>
  );
}
