import {ExcelComponent} from '@core/ExcelComponent'
import { shouldResize } from './table.functions'
import { resizeHandler } from './Table.resize'

import { createTable } from './table.template'
export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root){
      super($root,{
        name: 'table',
        listeners: ['mousedown'],
      })
    }
    toHTML(){
        return createTable(20)
    }
    onMousedown(event){
      if(shouldResize(event)){
        resizeHandler(event, this.$root)
      }
    }
}
