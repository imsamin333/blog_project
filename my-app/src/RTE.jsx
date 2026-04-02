import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import {Controller} from "react-hook-form"
 
function RTE({name, label, control, defaultValue = ""}) {
  return (
    <div className='w-full'>
        {label && <label className='mb-1 pl-1 inline-block'>{label}</label>}

        <Controller 
        name={name || "content"}
        control={control}
        render={({field: {onChange}})=>(
            <Editor 
            apiKey='knqohtcfb6cm445cv4zvam0ucp2lqghi0q4qqk7askmt0vaw'
            initialValue={defaultValue}
            init={{
                height:500,
                menuBar: true,
                plugins:[
                    'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                    'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                    'media', 'table', 'emoticons', 'help'
                ],
                toolbar:
                    'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                    'forecolor backcolor emoticons | help',
                content_style:"body{font-family: Halvetica,Arial, sans-serif: font-size:14px}"
                
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE