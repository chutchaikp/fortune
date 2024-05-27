### Web dev fundamental 

- How to use Github 
```console
$ git clone
$ git add .
$ git commit -m "commit"
$ git push --all
```

- How to .gitignore
```shell
# file .gitignore
# comment dependencies
/node_modules
/.env
```

- How to .env
```bash
# file .env
PORT=88
KEY=123456
```

- How to vscode, exclude files

```json
# file .vscode/settings.json
"files.exclude": {    
    "**/_____*.*": true    
}
```

- How to snippet
- How to verify unused and outdate package [npm-check or depcheck]
```bash
npm outdated -g
```

- How to use Promise
- How to use 'scss' in React App
```bash
$ npm install sass --save-dev
# ref https://www.robinwieruch.de/create-react-app-with-sass-support/
```
- How to lodash
```js
import _ from 'lodash'
const randomNumber = _.random(1, 99)
const isDate = _.isDate('xxx')
```
- How to work with json file
```js
import data from "./data.json";
```
- How to setInterval
```js
const interval = useRef()
const [randomnumber, setRandomnumber] = useState(0);
// start
interval.current = setInterval(() => {
  let n = _.random(1, 99)
  setRandomnumber(n)
}, 50);
// stop 
clearInterval(interval.current)
```

- How to use free host Netlify.com
- How to debounce
```js
  const useDebounce = (callback, delay) => {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceValue(callback)
    }, delay)

    return () => {
      clearTimeout(handle)
    }
  }, [callback, delay])

  return debounceValue
}
```

- How to font embed

```css
@font-face {
  font-family: Recoleta;
  src: url(./Recoleta-RegularDEMO.otf);
}

.FontsApp {  
  font-family: Recoleta, sans-serif;
  font-size: 25px;
}

```
- How to memorize (memo, useCallback)
go to file?

#### TODO
- How to custom hook

<!-- # Getting Started with Create React App -->
