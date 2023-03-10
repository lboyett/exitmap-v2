import avatar from "../../assets/avatar.jpeg";
import {
  Image,
  Flex,
  Text,
  Box,
  FormControl,
  useColorModeValue,
  Textarea,
  Button,
  Spinner,
} from "@chakra-ui/react";
import "./exit-comments.css";
import { useState } from "react";
import axios from "axios";
import { BiCommentAdd } from "react-icons/bi";
import { format, formatDistance, endOfDay } from "date-fns";

export interface commentsTypes {
  author: number;
  comment: string;
  created_at: string;
  exit: number;
  is_deleted: boolean;
  updated_at: string;
  _id: number;
}

interface FormInputs extends HTMLFormControlsCollection {
  new_comment: HTMLInputElement;
}

interface ExitCommentsPropTypes {
  comments: commentsTypes[] | undefined;
  exit_id: string | undefined;
  getExit: Function;
}

function ExitComments(props: ExitCommentsPropTypes) {
  const [addCommentButton, setAddCommentButton] = useState("");
  const [hideIcon, setHideIcon] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [ numComments, setNumComments] = useState(3); 
  const comments = props.comments;

  // console.log(
  //   props.comments
  //     ? props.comments.sort((a, b) => {
  //         return (
  //           (new Date(a.created_at) as any) - (new Date(b.created_at) as any)
  //         );
  //       })
  //     : null
  // );

  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";

  function showAddCommentButton() {
    if (addCommentButton === "") {
      setAddCommentButton("active");
      setHideIcon("inactive");
    } else {
      setAddCommentButton("");
      setHideIcon("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    const url = "http://localhost:8000/comments";
    try {
      const response = await axios.post(url, {
        comment: inputs.new_comment.value,
        exit_id: props.exit_id,
        author_id: 1, //USERID FixThis
      });
      setSubmitting(false);
      props.getExit();
      showAddCommentButton();
      inputs.new_comment.value = "";
    } catch (err: any) {
      setSubmitting(false);
      setErrorMessage(err.message);
    }
  }

  function showMoreComments() {
    setNumComments(numComments + 3)
  }

  function showLessComments() {
    setNumComments(3)
  }

  if (!comments) {
    return <></>;
  } else {
    return (
      <div className="comments">
        <Flex className="comments-title-container">
          <BiCommentAdd
            className={`add-comment-icon  ${hideIcon}`}
            onClick={showAddCommentButton}
          />
          <Flex className={`comment-button-container  ${addCommentButton}`}>
            {submitting ? <Spinner /> : null}
            {errorMessage ? errorMessage : null}
            <Text onClick={showAddCommentButton} cursor="pointer">
              Cancel
            </Text>
            <Button
              type="submit"
              form="comment-form"
              className={`comment-button`}
            >
              Post
            </Button>
          </Flex>
        </Flex>

        <form
          id="comment-form"
          className={`comment-form  ${addCommentButton}`}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <FormControl>
            <Textarea
              resize="none"
              className={inputColorMode}
              name="new_comment"
            />
          </FormControl>
        </form>

        {comments.slice(0,numComments).map((comment: any, i: number) => {
          return (
            <Flex className="comment" key={i}>
              <Image src={avatar} className="avatar-comments" />
              <Box>
                <Flex alignItems={"center"}>
                  <Text className="comment-username">
                    {"@" + comment.username}
                  </Text>
                  <Text fontWeight={"200"} fontSize="0.8rem">
                    {formatDistance(
                      new Date(comment.comment_created_at),
                      endOfDay(new Date()),
                      { addSuffix: true }
                    )}
                  </Text>
                </Flex>
                <Text>{comment.comment}</Text>
              </Box>
            </Flex>
          );
        })}
        {(comments.length > 3 && numComments < comments.length) ? <Button className="more-comments-button" onClick={showMoreComments}>View more comments</Button> : null}
        {(numComments >= comments.length) ? <Button className="more-comments-button" onClick={showLessComments}>View less comments</Button> : null}
      </div>
    );
  }
}

export default ExitComments;
