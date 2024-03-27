import {Button, Stack, TextField} from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useEffect, useRef, useState} from "react";
import Message from './Query/Message'
import Url from "../../utility/Url";
import * as R from 'ramda'

const localStorageKey = (index) => `index-${index}-messages`

const getLocalStorage = (index) => {
  const saved = localStorage.getItem(localStorageKey(index));
  return saved !== null ? JSON.parse(saved) : {uniqId: 0, messages: {}};
}

const Query = ({index}) => {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState(getLocalStorage(index))
  const messagesRef = useRef(null);

  useEffect(() => {
    setMessages(getLocalStorage(index))
  }, [index])

  useEffect(() => {
    localStorage.setItem(localStorageKey(index), JSON.stringify(messages));
    scrollToBottom()
  }, [messages])

  const addMessages = (messagesToAdd) => {
    let ids = []
    setMessages(({uniqId, messages}) => {
      const count = messagesToAdd.length
      ids = R.range(uniqId, uniqId + count)
      const newMessages = Object.fromEntries(R.zip(ids, messagesToAdd))

      return {
        uniqId: uniqId + count,
        messages: {...newMessages, ...messages}
      }
    })
    return ids
  }

  const updateMessage = (idToUpdate, newMessage) => {
    setMessages(({uniqId, messages}) => ({
      uniqId: uniqId,
      messages: Object.fromEntries(
        Object.entries(messages).map(([id, [message, who]]) => (
          parseInt(id) === idToUpdate ? [id, [newMessage, who]] : [id, [message, who]]
        ))
      )
    }))
  }

  const scrollToBottom = () => {
    const element = messagesRef?.current
    if(!element) return

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    });
  }

  const sendQuery = async () => {
    // eslint-disable-next-line no-unused-vars
    const [_, id] = addMessages([
      [query, 'right'],
      [null, 'left']
    ])

    const response = await fetch(Url.query(index), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query})
    })

    if (!response.ok)
      return

    const data = await response.json();

    updateMessage(id, data?.response || 'No response received! Try again.')
    setQuery("")
  }

  return (
    <>
      <Stack direction="column" height="100%" spacing={2}>
        <Stack overflow="auto" pr={3} spacing={1} useFlexGap={true} ref={messagesRef}>
          {Object.entries(messages.messages).map(([id, [message, who]]) => (
            <Message key={id} variant={who} value={message} />
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Query"
            placeholder="Provide your query here"
            multiline
            minRows={3}
            fullWidth
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <Button variant="outlined" onClick={sendQuery}>
            <KeyboardReturnIcon fontSize="large" />
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default Query
