import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseMeal,validateItems,nutrition,saveEntry,totals,seedEntries} from '../src/model.mjs';
test('entende acentos e quantidades explícitas sem assumir todas as porções',()=>{const m=parseMeal('150 g de arroz, 80 g de feijão e frango');assert.deepEqual(m.items.map(i=>i.grams),[150,80,100]);assert.equal(m.items[2].assumed,true);});
test('bloqueia entrada vazia e alimentos fora da demonstração',()=>{assert.throws(()=>parseMeal(''));assert.throws(()=>parseMeal('pizza'));});
test('valida os limites inclusive entradas inválidas',()=>{for(const grams of ['',0,-1,501,NaN])assert.equal(validateItems([{key:'arroz',grams}]),false);assert.equal(validateItems([{key:'arroz',grams:150}]),true);});
test('editar atualiza o total sem duplicar o registro',()=>{const list=seedEntries('2026-11-05');const old=totals(list);const edit={...list[1],items:list[1].items.map(i=>i.key==='arroz'?{...i,grams:150}:i)};const next=saveEntry(list,edit);assert.equal(next.length,2);assert.equal(totals(next).kcal-old.kcal,65);assert.equal(nutrition(edit.items).kcal,440);});
