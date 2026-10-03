import test from 'node:test';
import assert from 'node:assert/strict';
import {intervalExplanation} from '../src/intervals.js';
test('counts visible intervals at a fixed 3/8 endpoint',()=>{
  assert.match(intervalExplanation(6,16),/6 small intervals: 6\/16 inch = 3\/8 inch/);
  assert.match(intervalExplanation(6,8),/3 small intervals: 3\/8 inch/);
  for(const scale of [2,4])assert.match(intervalExplanation(6,scale),/requires finer visible graduations/);
});
test('practice hides solved counts and handles mixed lengths',()=>{
  assert.doesNotMatch(intervalExplanation(10,16,false),/10|5\/8/);
  assert.match(intervalExplanation(10,16),/10 small intervals: 10\/16 inch = 5\/8 inch/);
  assert.match(intervalExplanation(19,16),/1 whole inch, then count 3/);
});
