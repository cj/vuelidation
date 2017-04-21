<h1 style='text-align: center;'>Vuelidation <span style='font-size: .5em;'>- simple, powerful, vuejs validation. (<a href="https://codepen.io/cj/pen/BRNzgd">Example</a>)</span></h1>

<p align="center">
  <a href="https://travis-ci.org/cj/vuelidation"><img src="https://img.shields.io/travis/cj/vuelidation/master.svg" alt="Build Status" target="_blank"></a>
  <a href="https://coveralls.io/github/cj/vuelidation?branch=master"><img src="https://img.shields.io/coveralls/cj/vuelidation/master.svg" alt="Coverage Status" target="_blank"></a>
  <a href="https://www.npmjs.com/package/vuelidation"><img src="https://img.shields.io/npm/dt/vuelidation.svg" alt="Downloads" target="_blank"></a>
  <a href="https://gitter.im/cj/vuelidation"><img src="https://img.shields.io/badge/GITTER-join%20chat-green.svg" alt="Gitter" target="_blank"></a>
  <a href="https://github.com/cj/vuelidation/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

**Install**

`yarn add --dev vuelidation@latest`

**Include Plugin**
```javascript
import Vue from 'vue';
import Vuelidation from 'vuelidation';

Vue.use(Vuelidation);
```
**Use**
```vue
<script>
  new Vue({
    data () {
      return {
        name: '',
      }
    },
    
    vuelidation: {
      data: {
        name: {
          required: true,
        },
      },
    },
    
    methods: {
      submit () {
        if (this.$vuelidation.valid()) {
          console.log(`Hello, ${this.name}!`)
        }
      }
    }
  })
</script>

<template>
  <form>
    <input type='text' v-model='name' />
    <div v-if='$vuelidation.error("name")'>{{ $vuelidation.error('name') }}</div>
    
    <button type="submit" :disabled="$vuelidation.errors()">Submit</button>
  </form>
</template>
```

## Validations

<details>
<summary>
  <a href='#validations-alphabetic'><b>alphabetic</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li>Must be a alphabetic value</li>
      <li><b>args:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  alphabetic: true,
}
```
</details>

<details>
<summary>
  <a href='#validations-alpha'><b>alpha</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li>Must only contain letters and numbers</li>
      <li><b>args:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  alpha: true,
}
```
</details>

<details>
<summary>
  <a href='#validations-alphaDash'><b>alphaDash</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Must only contain letters, numbers, underscores or dashes</li>
      <li><b>arg:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  alphaDash: true,
}
```
</details>

<details>
<summary>
  <a href='#validations-alphaSpace'><b>alphaSpace</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Must only contain letters, numbers or spaces</li>
      <li><b>arg:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  alphaSpace: true,
}
```
</details>

<details>
<summary>
  <a href='#validations-between'><b>between</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Must be between {{ min }} and {{ max }}</li>
      <li><b>arg:</b> { min: Number, max: Number }</li>
    </ul>
  </p>
</summary>

```javascript
{
  between: {
    min: 5,
    max: 10,
  },
}
```
</details>

<details>
<summary>
  <a href='#validations-decimal'><b>decimal</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Must be a decimal<% if (points && points !== "*") { %> with {{ points }} points<% } %></li>
      <li><b>arg:</b> { points: *Number }</li>
    </ul>
  </p>
</summary>

```javascript
{
  decimal: {
    points: 2,
  },
}
```
</details>

<details>
<summary>
  <a href='#validations-email'><b>email</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Not a valid email</li>
      <li><b>arg:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  email: true,
}
```
</details>

<details>
<summary> <a href='#validations-includes'><b>includes</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> {{ value }} is not one of the following: {{ values.join(", ") }}</li>
      <li><b>arg:</b> { includes: Array }</li>
    </ul>
  </p>
</summary>

```javascript
{
  includes: ['foo', 'bar'],
}
```
</details>

<details>
<summary>
  <a href='#validations-numeric'><b>numeric</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Must be a numeric value</li>
      <li><b>arg:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  numeric: true,
}
```
</details>

<details>
<summary>
  <a href='#validations-required'><b>required</b></a>
  <p style='margin: 0; '>
    <ul style='margin: 0; padding: 0; list-style-type: none;'>
      <li><b>msg:</b> Required</li>
      <li><b>arg:</b> Boolean</li>
    </ul>
  </p>
</summary>

```javascript
{
  required: true,
}
```
</details>

<b>*</b> - the **arg** is optional.
