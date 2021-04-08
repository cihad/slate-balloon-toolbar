import { useCallback, useMemo, useState } from 'react';
import './App.css';
import { Slate, withReact, Editable, ReactEditor } from 'slate-react'
import { Descendant, createEditor, Editor, Path } from 'slate';
import { ColoredBoxElement, ColoredBoxToolbar } from './colored-box';
import { ImageElement, ImageToolbar, withImage } from './image';
import { BalloonToolbarProvider } from '../toolbar';
import { CaptionElement, CaptionToolbar } from './caption'
import { AppBalloonToolbar } from './AppBalloonToolbar'

const initialValue = [
  {
    children: [
      {
        type: 'h2',
        children: [
          { text: 'only colored-box toolbar' }
        ]
      },
      {
        type: 'colored-box',
        color: '#c4def6',
        children: [
          {
            type: 'h2',
            children: [
              { text: 'box title' }
            ]
          },
          {
            type: 'p',
            children: [
              {
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              }
            ]
          }
        ]
      },
      {
        type: 'h2',
        children: [
          { text: 'only image toolbar' }
        ]
      },
      {
        type: 'image',
        url: 'http://placeimg.com/640/360/any',
        children: [{text:''}]
      },
      {
        type: 'h2',
        children: [
          { text: 'image in colored-box (multiple toolbar)' }
        ]
      },
      {
        type: 'colored-box',
        color: '#fccb00',
        children: [
          {
            type: 'image',
            url: 'http://placeimg.com/640/360/any',
            children: [{text:''}]
          },
          {
            type: 'caption',
            children: [{text: 'caption'}]
          },
          {
            type: 'caption',
            children: [{text: 'caption'}]
          }
        ]
      },
    ]
  }
]

declare global {
  interface Window { slate: any; editor: any; }
}

const toolbarRegistry = {
  'image': ImageToolbar,
  'caption': CaptionToolbar,
  'colored-box': ColoredBoxToolbar
}

export function App() {
  const editor = useMemo(() => withImage(withReact(createEditor() as ReactEditor)), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)

  window.slate = {
    Editor,
    Path
  }
  window.editor = editor

  return (
    <div className="App">
      <h1>slate-balloon-toolbar demo</h1>
      <Slate editor={editor} value={value} onChange={setValue}>
        <BalloonToolbarProvider
          registry={toolbarRegistry}
          renderToolbar={AppBalloonToolbar}
        />
        <Editable
          renderElement={useCallback((props: any) => {
            const { element } = props

            switch(element.type) {
              case 'caption':
                return <CaptionElement {...props} />
              case 'image':
                return <ImageElement {...props} />
              case 'colored-box':
                return <ColoredBoxElement {...props} />
              case 'p':
                return <p {...props.attributes}>{props.children}</p>
              case 'h2':
                return <h2 {...props.attributes}>{props.children}</h2>
              default:
                return <div {...props.attributes}>{props.children}</div>
            }
          }, [])}
        />
      </Slate>
    </div>
  );
}

export default App;
