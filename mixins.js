_.mixin({
  printIf: function(key) {
    if (typeof key !== undefined) {
      return key;
    }
    else {
      return;
    }
  }
});