const fs = require('fs');
const path = require('path');
const readline = require('readline');
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const dirPath = path.join(__dirname, '/vanilla-i18n');

r1.question('Enter path to CSV file: ', (answer) => {
  if (fs.existsSync(answer)) {
    const csvFile = fs.readFileSync(answer, { encoding: 'utf8' });
    // console.log(csvFile)
    const languages = csvFile
      .split('\r\n')
      .splice(0, 1)
      .join('')
      .split(',')
      .splice(1);
    const csvArr = csvFile.split('\r\n').splice(1);
    let csvTemp = [];

    for (let k = 0; k < csvArr.length; k++) {
      csvTemp[k] = csvArr[k].split(',');
    }


    const transpose = csvTemp[0].map((_, colIndex) =>
      csvTemp.map((row) => row[colIndex])
    );

    const csvTransposed = transpose.join('\n').split('\n').splice(1);
    const header = transpose.join('\n').split('\n').splice(0, 1);
    console.log(`DEBUG: Languages found are ${JSON.stringify(languages)}`);

    const constructObj = (str, parentObj, data) => {
      if (str.split('.').length === 1) {
        parentObj[str] = data;
        return parentObj;
      }

      let curKey = str.split('.')[0];
      if (!parentObj[curKey]) parentObj[curKey] = {};
      parentObj[curKey] = constructObj(
        str.split('.').slice(1).join('.'),
        parentObj[curKey],
        data
      );
      return parentObj;
    };

    const csvFinal = csvTransposed.map((row) => {
       let obj = {};
      // row = row.split("/comma/").join(",")
      // console.log(row)
      let rowData = row.split(',');

      header[0].split(',').forEach(function (val, idx) {
        obj = constructObj(val, obj, rowData[idx]);
      });
      return obj;
    });

    const create = (csvFinal, dirPath) => {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        create(csvFinal, dirPath);
      } else {
        for (let i = 0; i < languages.length; i++) {
          fs.writeFileSync(
            `${dirPath}/${languages[i]}.json`,
            JSON.stringify(csvFinal.splice(0, 1)).replace(/^\[|]$/g, ''),
            'UTF-8'
          );
        }
        console.log(`INFO: Language JSON have been output in ${dirPath}`);
      }
    };
    
    csvFinal_keys = (Object.keys(csvFinal[0]))
    csvFinal_values = (Object.values(csvFinal[0]))

    for (let counter in csvFinal_keys) {
      if (csvFinal_values[counter].indexOf('|') != -1) {
        csvFinal[0][csvFinal_keys[counter]] = csvFinal[0][csvFinal_keys[counter]].split('|').join(',')
      }
    }

    create(csvFinal, dirPath);

    r1.close();
  } else {
    console.log('Invalid File CSV file');
    r1.close();
  }
});
