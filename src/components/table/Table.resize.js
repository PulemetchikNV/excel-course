import { $ } from "../../core/dom";


export function resizeHandler(event, root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const cells = root.findAll(`[data-col="${$parent.data.col}"]`)
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let valueX, valueY
  $resizer.css({
      opacity: '1',
      [sideProp]: '-5000px'   
  })
  console.log(root);
  document.onmousemove = e => {
    if(type == 'col'){
      const delta = (e.pageX - coords.right)
      valueX = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    }
    else{
      const delta = (e.pageY - coords.bottom)
      valueY = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    } 
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if(type == 'col'){
      $parent.css({width : valueX + 'px'})
      cells.forEach(el => el.style.width = valueX + 'px')
    }else{
      $parent.css({height : valueY + 'px'})
    }
    $resizer.css({
      right: 0,
      opacity: '0',
      bottom: 0
    })
  }
}