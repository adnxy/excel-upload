# excel-upload

A node.js module for uploading and converting excel files into JSON.

### Installing

```
npm install excel-upload
```

Requirements
============

* [node.js](http://nodejs.org/) -- v4.5.0 or newer

### Usage

Uploading, storing and parsing files is done asynchronous and the result is returned as a Promise.

Don't forget the enctype="multipart/form-data" in your form.

**Browser:**

```
<form action="/upload-documents" method="post" enctype="multipart/form-data">
  <input type="file" name="document" />
</form>
```

**Controller:**

```
import uploadFile from 'excel-upload';
  
static async post(req, res, next) {
 
    const upload = await uploadFile(req, "document-name", "./uploaded", "document");
 
      res.json(upload);
  }
```

NOTE: Before using excel-upload, make sure you create a corresponding folder in the root where uploaded files will be stored ("./uploaded"). 


## API

| Key | Description |
| --- | --- |
| req | req express.js object |
| fileName | name of the uploaded file|
| fileLocation | location where uploaded file is stored |
| fieldName | field name specified in the form |



## Built With

* [Node](https://nodejs.org/en/) - Node.js 
* [Multer](https://www.npmjs.com/package/multer) - Node.js module for upload files

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


