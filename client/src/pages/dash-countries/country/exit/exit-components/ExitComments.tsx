import avatar from "../../../../../assets/avatar.jpeg";
import { Image, Flex, Text, Heading } from "@chakra-ui/react";
import "./exit-comments.css";

function ExitComments(props: any) {
  const comments = props.comments;

  return (
    <div className="comments">
      <Heading as="h2" className="comments-title">
        Comments
      </Heading>
      {comments.map((comment: any, i: number) => {
        return (
          <Flex className="comment" key={i}>
            <Image src={avatar} className="avatar-comments" />
            <Text><b style={{marginRight:'4px'}}>{'@' + comment.username}</b>{comment.text}</Text>
          </Flex>
        );
      })}
    </div>
  );
}

export default ExitComments;
