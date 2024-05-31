import { ref, computed } from 'vue';
function isValidExpression(expression) {
  try {
    eval(expression);
    return true;
  } catch (e) {
    return false;
  }
}
export const useCalculatorStore = defineStore('calculator', () => {
  const theme = ref('dark');
  const display = ref('');
  const history = ref([]);
  const calculated = ref(false);

  function updateThemeMode(value) {
    theme.value = value;
  }

  function toggleCalculated() {
    calculated.value = !calculated.value;
  }

  function updateDisplay(value) {
    display.value = value;
  }

  function clearDisplay() {
    display.value = '';
  }

  function updateHistory(value) {
    history.value.push(value);
  }

  function clearHistory() {
    history.value = [];
  }

  function checkThemeMode() {
    if (
      localStorage.Gischa_Calculator_Theme === 'dark' ||
      !('Gischa_Calculator_Theme' in localStorage)
    ) {
      document.documentElement.classList.add('dark');
      updateThemeMode('dark');
    } else {
      document.documentElement.classList.remove('dark');
      updateThemeMode('light');
    }
  }

  function updateTheme(value) {
    localStorage.Gischa_Calculator_Theme = value;
    updateThemeMode(value);

    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function calculate() {
    const operators = ['*', '/', '+', '-', '.'];

  const displayLastIndex = display.value[display.value.length - 1];
    if (operators.includes(displayLastIndex)) {
      updateDisplay(display.value.slice(0, -1));
    }

    
    if(isValidExpression(display.value)){
      updateHistory(display.value);
      const result = eval(display.value);
      updateDisplay(String(result));
    } else {
      console.log('Invalid Expression');
    }
    toggleCalculated();
  }

  function updateDisplayAction(value) {
    let prevDisplay = display.value;
    const operators = ['*', '/', '+', '-', '.'];

    if (calculated.value) {
      if (!operators.includes(value)) {
        prevDisplay = '';
        toggleCalculated();
        clearHistory();
      } else {
        toggleCalculated();
      }
    }

    if (operators.includes(value)) {
      if (!prevDisplay.length) {
        prevDisplay = '0';
      }
      else if (operators.includes(prevDisplay[prevDisplay.length - 1])) {
        prevDisplay = prevDisplay.slice(0, -1);
      }
    }

    const newDisplay = `${prevDisplay}${value}`;
    updateDisplay(newDisplay);
  }

  function clearOne() {
    const prevDisplay = display.value;
    const newDisplay = prevDisplay.slice(0, -1);

    updateDisplay(newDisplay);
  }

  function clearAll() {
    clearDisplay();
    clearHistory();
  }
  
  watch(() => display.value, (newValue) => {
    display.value = newValue;
  });

  return {
    theme,
    display,
    history,
    calculated,
    updateThemeMode,
    toggleCalculated,
    updateDisplay,
    clearDisplay,
    updateHistory,
    clearHistory,
    checkThemeMode,
    updateTheme,
    calculate,
    updateDisplayAction,
    clearOne,
    clearAll,
  };
});
