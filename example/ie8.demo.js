var React = require('react')
var UploadPicker = require('upload.react').default
var UploadFile = require('upload.react').UploadFile

var App = React.createClass({
    getInitialState: function () {
        return {
            src: '',
            id: '',
            action:'http://192.168.10.39:50044/upload?status=success'
        }
    },
    render: function () {
        var self = this
        return (
            <div>
            	<h3>一次只能选择一个文件</h3>
                {'action type :  '}
                <select onChange={function(e){
                            self.setState({
                                action:e.target.value
                            })
                        }}
                >
                    <option value="http://192.168.10.39:50044/upload?status=success" >action default</option>
                    <option value="http://192.168.10.39:32954/upload?status=success" >action cross-domain</option>
                </select>
                <hr />
	            {/* TODO : allow , size , onError */}
                <UploadPicker name="file"
                    action={self.state.action}
                    data={{'a':'1'}}
                    thumb={'http://dummyimage.com/200x200/000/fff?text=thumb'}
                    onPick={function (files) {
                        alert('onPick : '+files[0].id)
                        /* ie下files.length == 0
                        files: [
                            {
                                id: '3fiuhwufhweufgwef',
                                name: 'ashdasdasd.jpg',
                                // thumb base64 or defaultThumb
                                // defaultThumb blob
                                thumb: 'BASE64:sufihsiufh'
                            },
                        ]
                        */
                        self.setState({
                            src:files[0].thumb
                        })

						UploadFile({
                            id : files[0].id ,
                            onProgress : function (step, file) {
                                /*
                                    // 精确的浮点数
                                    step = 30.214124
                                */
                                // let percent = Math.round(step.percent)
                                alert('上传进度'+step.percent)
                            },
                            onSuccess : function (res) {
                            	alert('onSuccess : '+res)
                                res = JSON.parse(res) || res
                                self.setState({
                                    id: res.data.id || ''
                                })
                            },
                            onError : function (err, res){
                                alert(JSON.stringify(err))
                                alert(JSON.stringify(res))
                            },
                            onXhrError: function(e) {
                                alert(JSON.stringify(e))
                            }
                        })
                    }}
                 >
                     {
                         self.state.src
                         ? (<img src={self.state.src} alt="" style={{maxWidth:100+'px'}}/>) : null
                     }
                    <button type="button">Picker</button>
                </UploadPicker>
            </div>
        )
    }
})
module.exports = App
