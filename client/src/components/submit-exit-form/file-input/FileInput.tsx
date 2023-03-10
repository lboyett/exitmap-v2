import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Box,
  useColorModeValue,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import "./file-input.css";

interface FileInputProps {
  updateForm: Function;
  isInvalidFileType: boolean;
}

export default function FileInput({
  updateForm,
  isInvalidFileType,
}: FileInputProps) {
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState<FormData>();
  const [borderColor, setBorderColor] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileInvalid, setFileInvalid] = useState(false);

  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const lightMode = useColorModeValue(true, false);
  const inputMode = lightMode ? "input-light" : "input-dark";

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!validateFileIsImage(e.dataTransfer.files[0])) {
      setFileInvalid(true);
      setFileName("");
      setFormData(undefined);
      return;
    }
    setFileInvalid(false);
    setBorderColor(undefined);
    setFileName(e.dataTransfer.files[0].name);
    const formData = new FormData();
    formData.append("image", e.dataTransfer.files[0]);
    setFormData(formData);
  }

  function handleChooseFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    if (!validateFileIsImage(e.target.files[0])) {
      setFileInvalid(true);
      setFileName("");
      setFormData(undefined);
      return;
    }
    setFileInvalid(false);
    setFileName(e.target.files[0].name);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setFormData(formData);
  }

  useEffect(() => {
    updateForm(formData);
  }, [formData]);

  function validateFileIsImage(file: File) {
    const mimeTypes = [
      "image/avif",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (!mimeTypes.includes(file.type)) {
      return false;
    }
    return true;
  }

  return (
    <FormControl isInvalid={fileInvalid}>
      <FormLabel>Upload Image</FormLabel>
      <Input
        type="file"
        ref={fileInput}
        display="none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChooseFile(e);
        }}
      />
      <Input
        as="div"
        className={`input-div ${inputMode}`}
        color={borderColor}
        borderColor={
          fileInvalid ? "red !important" : `${borderColor} !important`
        }
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
        isInvalid={fileInvalid}
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
      <Flex gap="1rem">
        <FormHelperText>drag and drop an image file</FormHelperText>
        <FormErrorMessage>
          Please chooose a valid file type (jpeg, png, webp, avif, svg)
        </FormErrorMessage>
      </Flex>
    </FormControl>
  );
}
