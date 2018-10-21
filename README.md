# socialcops_task

Project Setup

1)	Visit given repo on GitHub & fetch all the code https://github.com/anuj0361/socialcops_task
2)	After fetching all the code execute “npm install” on the terminal, it will install all the dependencies of the project.
3)	Create a folder in your project folder named “config” then inside that create a file “keys.js”. Put the below code:
module.exports = {
  secret: "putAnyRandomValue"
};
4)	Last step run “ npm start” on the terminal.


APIs

1)	Project contains 3 APIs:
a)	/api/login: Public API takes an arbitrary “email” & “password” as input & retunrns jwt token in response.
b)	/api/patch/applyJSONPatch: Private API, takes jwt token generated in login API, takes 2 inputs “jsonObject” &  “patch” then it returns a patched JSON object in response.
c)	 /api/thumbnail/createThumbnail: Private API takes jwt token generated in login API, takes 1 input “imageURL”, then it generates an thumbnailed image in images folder of the directory.


API Usage

1)	Login API: Open postman and and provide URL: POST localhost:3000/api/login
In body pass two parameters “email” & “password”, click on send, it should return you a JWT token.
2)	PATCH API: Open postman and and provide URL: POST localhost:3000/api/patch/applyJSONPatch
In body provide 2 parameters “jsonObject” & “patch” along with their values. Also provide a auth token obtained in login API, click on send, it should return you a patched object
Ex: 
{
    "jsonObject": {"foo": [1, 3]},
    "patch": [{"op": "add", "path": "/foo/1", “value”: 2}]
}
3)	Thumbnail API: Open postman and and provide URL: POST localhost:3000/api/thumbnail/createThumbnail
In body provide 1 parameters “imageURL”along with a public URL value. Also provide a auth token obtained in login API, click on send, it should save original image & thumbnailed image in image directory of your project.
Ex: https://wallpaperbrowse.com/media/images/750814.jpg


Test cases

1)	For running test suite, run npm test on the terminal then it should run all the TCs that I have written

