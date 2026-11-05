export const foods = {
 arroz: {name:'Arroz cozido', icon:'🍚', kcal:1.3, protein:.03, carbs:.28, fat:.003},
 feijao: {name:'Feijão cozido', icon:'🫘', kcal:.8, protein:.05, carbs:.14, fat:.005},
 frango: {name:'Frango grelhado', icon:'🍗', kcal:1.65, protein:.31, carbs:0, fat:.036},
 iogurte: {name:'Iogurte natural', icon:'🥣', kcal:.61, protein:.035, carbs:.047, fat:.033},
 banana: {name:'Banana', icon:'🍌', kcal:.89, protein:.011, carbs:.23, fat:.003},
 aveia: {name:'Aveia', icon:'🌾', kcal:3.89, protein:.169, carbs:.663, fat:.069},
 pao: {name:'Pão integral', icon:'🍞', kcal:2.5, protein:.09, carbs:.43, fat:.04},
 ovo: {name:'Ovos', icon:'🥚', kcal:1.43, protein:.13, carbs:.007, fat:.095},
};
export const samples = [
 {label:'Almoço',text:'Comi arroz, feijão e frango.',items:[['arroz',100],['feijao',100],['frango',100]]},
 {label:'Café da manhã',text:'Iogurte natural com banana e aveia.',items:[['iogurte',170],['banana',90],['aveia',30]]},
 {label:'Lanche',text:'Pão integral com ovos.',items:[['pao',50],['ovo',100]]},
];
export const normalize = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export function parseMeal(text){
 const clean=normalize(text);
 if(!clean.trim())throw new Error('Conte o que você comeu para continuar.');
 const sample=samples.find(s=>s.items.every(([key])=>clean.includes(key)));
 if(!sample)throw new Error('Para testar, escolha um dos exemplos abaixo. Esta demonstração ainda não reconhece outras refeições.');
 return {label:sample.label,text:text.trim(),items:sample.items.map(([key,g])=>{
 const found=clean.match(new RegExp('(\\d+(?:[.,]\\d+)?)\\s*g(?:ramas)?\\s*(?:de\\s+)?'+key));
 return {key,grams:found?Number(found[1].replace(',','.')):g,assumed:!found};
 })};
}
export function validateItems(items){return items.length>0&&items.every(i=>foods[i.key]&&Number.isFinite(Number(i.grams))&&Number(i.grams)>=10&&Number(i.grams)<=500);}
export function nutrition(items){
 const value=items.reduce((acc,item)=>{const f=foods[item.key];for(const k of Object.keys(acc))acc[k]+=f[k]*Number(item.grams);return acc;},{kcal:0,protein:0,carbs:0,fat:0});
 return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,Math.round(v)]));
}
export function totals(entries){return entries.reduce((total,e)=>{const n=nutrition(e.items);for(const k of Object.keys(total))total[k]+=n[k];return total;},{kcal:0,protein:0,carbs:0,fat:0});}
export function saveEntry(entries,entry){return entries.some(e=>e.id===entry.id)?entries.map(e=>e.id===entry.id?entry:e):[...entries,entry];}
export const localDate=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export function seedEntries(day){return [1,0].map((index,i)=>({...samples[index],items:samples[index].items.map(([key,grams])=>({key,grams})),id:'demo-'+i,day,time:i?'12:30':'08:00'}));}
