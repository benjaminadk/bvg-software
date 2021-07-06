// https://observablehq.com/@benjaminadk/checkbox-with-color-key@88
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Checkbox with color key

Modified [@unkleho/checkbox-with-color-key](https://observablehq.com/@unkleho/checkbox-with-color-key) 

which is a modification of [@jashkenas/inputs](https://observablehq.com/@jashkenas/inputs) library checkbox to include a color key`
)});
  main.variable(observer("viewof ch")).define("viewof ch", ["checkbox"], function(checkbox){return(
checkbox({
  title: "Colors",
  description: "Please select your favorite colors",
  options: [
    { value: "r", label: "Red", color: "red" },
    { value: "o", label: "Orange", color: "orange"  },
    { value: "y", label: "Blue", color: "blue"  }
  ],
  value: ["r", "o"]
})
)});
  main.variable(observer("ch")).define("ch", ["Generators", "viewof ch"], (G, _) => G.input(_));
  main.variable(observer()).define(["ch"], function(ch){return(
ch
)});
  main.variable(observer("checkbox")).define("checkbox", ["input","html"], function(input,html){return(
function checkbox(config = {}) {
  let { value: formValue, title, description, submit, options } = Array.isArray(
    config
  )
    ? { options: config }
    : config;
  options = options.map(o =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const form = input({
    type: "checkbox",
    title,
    description,
    submit,
    getValue: input => {
      if (input.length)
        return Array.prototype.filter
          .call(input, i => i.checked)
          .map(i => i.value);
      return input.checked ? input.value : false;
    },
    form: html`
      <form>
        ${options.map(({ value, label, color }) => {
          const colorBlock = html`<span style="display: inline-block; background-color: ${color}; width: 1em; height: 1em; border-radius: 1em"></span>`;
          const input = html`<input type=checkbox name=input ${
            (formValue || []).indexOf(value) > -1 ? "checked" : ""
          } style="vertical-align: baseline;" />`;
          input.setAttribute("value", value);
          const tag = html`<label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;">
           ${input}
           ${colorBlock}
           ${label}
          </label>`;
          return tag;
        })}
      </form>
    `
  });
  form.output.remove();
  return form;
}
)});
  main.variable(observer("input")).define("input", ["html","d3format"], function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif; margin-bottom: 3px;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic; margin-top: 3px;">${description}</div>`
    );
  if (format)
    format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(form.input) : form.input.value;
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)});
  main.variable(observer("radio")).define("radio", ["input","html"], function(input,html){return(
function radio(config = {}) {
  let {
    value: formValue,
    title,
    description,
    submit,
    options,
    disabled
  } = Array.isArray(config) ? { options: config } : config;
  options = options.map(o =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const form = input({
    type: "radio",
    title,
    description,
    submit,
    getValue: input => {
      if (input.checked) return input.value;
      const checked = Array.prototype.find.call(input, radio => radio.checked);
      return checked ? checked.value : undefined;
    },
    form: html`
      <form>
        ${options.map(({ value, label }, i) => {
          const input = html`<input type=radio name=input ${
            value === formValue ? "checked" : ""
          } style="vertical-align: top; ${
            i === 0 ? `margin-left: 1px;` : ``
          }" />`;
          input.setAttribute("value", value);
          if (disabled) input.setAttribute("value", disabled);
          const tag = html`
          <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;">
           ${input}
           ${label}
          </label>`;
          return tag;
        })}
      </form>
    `
  });
  form.output.remove();
  return form;
}
)});
  main.variable(observer("d3format")).define("d3format", ["require"], function(require){return(
require("d3-format@1")
)});
  return main;
}
