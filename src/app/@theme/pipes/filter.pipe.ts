// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name : 'searchPipe',
// })
// export class SearchPipe implements PipeTransform {
//   public transform(value, key: string, term: string) {
//     return value.filter((item) => {
//       if (item.hasOwnProperty(key)) {
//         if (term) {
//           return true;
          
//         } else {
//           let regExp = new RegExp('\\b' + term, 'gi');
//           return regExp.test(item[key]);
//         } 
//       }
//     });
//   }
// }

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {
    if (!term) return value;
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }
}