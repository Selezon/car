// Generated by CoffeeScript 1.8.0
(function() {
  var globalGetreloadModels, infoModels, reloadModels;

  reloadModels = function(yearSlide) {
    var globalGetreloadModels, make, selected_models, year, _selected_models;
    make = ($("#selected_make").val() === "" ? 0 : $("#selected_make").val());
    year = yearSlide.slider("getValue");
    selected_models = $(document).find("#selected_models");
    _selected_models = selected_models[0].selectize;
    if (typeof globalGetreloadModels !== "undefined" && globalGetreloadModels !== null) {
      globalGetreloadModels.abort();
    }
    globalGetreloadModels = $.get("/get/models/" + make + "/" + year + "/", function(data) {
      _selected_models.clearOptions();
      _selected_models.load(function(callback) {
        callback(data);
      });
    });
  };

  infoModels = function(id, yearSlide) {
    "use strict";
    var selected_models_trim, type;
    type = "";
    selected_models_trim = $("#selected_models_trim")[0].selectize;
    if ($.isNumeric(id)) {
      type = "id";
    } else {
      type = "name";
    }
    $.get("/get/info/models/" + type + "/" + id + "/" + yearSlide.slider("getValue"), function(data) {
      var trims;
      trims = data.length;
      selected_models_trim.clearOptions();
      selected_models_trim.load(function(callback) {
        callback(data);
      });
    });
  };

  globalGetreloadModels = null;

  $(document).ready(function() {
    var firstLit, make_select, vinId, vinSend, yearSlide;
    vinSend = $("#vinSend");
    vinId = $("#vinId");
    yearSlide = $(".slider").slider();
    make_select = $(".make_select");
    firstLit = null;
    vinId.on("keyup focusout", function() {
      var alNumRegex, text;
      text = $(this).val();
      alNumRegex = /^([a-zA-Z0-9]+)$/;
      $(this).parent().removeClass("has-success has-error");
      vinSend.removeClass("btn-danger btn-success").find("i").removeClass("fa-check fa-times");
      if (text.length === 17 && alNumRegex.test(text)) {
        $(this).parent().addClass("has-success");
        vinSend.addClass("btn-success").find("i").addClass("fa-check");
      } else {
        $(this).parent().addClass("has-error");
        vinSend.addClass("btn-danger").find("i").addClass("fa-times");
      }
    });
    vinSend.click(function() {
      if ($(this).hasClass("btn-success")) {
        $.ajax({
          url: "/get/vin",
          type: "GET",
          data: {
            vin: vinId.val()
          },
          dataType: "json",
          success: function(data) {
            console.log(data);
          }
        });
      }
    });
    yearSlide.on("slideStop", function() {
      $("#settings_year h6").text(yearSlide.slider("getValue"));
      reloadModels(yearSlide);
    }).on("slide", function() {
      $("#settings_year h6").text(yearSlide.slider("getValue"));
    });
    $.get("/get/makes/", function(data) {
      $("#selected_make").selectize({
        options: data,
        labelField: "name",
        valueField: "id",
        maxItems: 1,
        sortField: "name",
        persist: false,
        create: function(input) {
          return {
            name: input,
            id: input
          };
        },
        onChange: function() {
          reloadModels(yearSlide);
        },
        render: {
          option: function(data, escape) {
            var make, text;
            make = escape(data.name);
            text = "";
            if (firstLit !== make[0].toUpperCase()) {
              if (firstLit != null) {
                text += "</div>";
              }
              text += "<div data-value=\"\" data-selectable=\"false\" data-group=\"" + make[0] + "\" class=\"optgroup\">" + "<div class=\"optgroup-header\">" + make[0] + "</div>";
              firstLit = make[0].toUpperCase();
            }
            text += "<div data-value=\"" + escape(data.id) + "\" data-selectable=\"\" class=\"active-result group-option\">" + make.charAt(0).toUpperCase() + make.substr(1) + "</div>";
            return text;
          },
          item: function(data, escape) {
            return "<span class=\"tag label label-info\">" + escape(data.name) + "</span>";
          }
        }
      });
    });
    $("#selected_models").selectize({
      labelField: "name",
      valueField: "id",
      maxItems: 1,
      sortField: "name",
      render: {
        option: function(data, escape) {
          var make, text;
          make = escape(data.name);
          text = "<div data-value=\"" + escape(data.id) + "\" data-selectable=\"\" class=\"active-result group-option\">" + make.charAt(0).toUpperCase() + make.substr(1) + "</div>";
          return text;
        },
        item: function(data, escape) {
          return "<span class=\"tag label label-info\">" + escape(data.name) + "</span>";
        }
      },
      persist: true,
      hideSelected: true,
      onChange: function(input) {
        "use strict";
        infoModels(input, yearSlide);
      },
      create: function(input) {
        return {
          name: input,
          id: input
        };
      }
    });
    $("#selected_models_trim").selectize({
      labelField: "model_trim",
      valueField: "id",
      maxItems: 1,
      sortField: "model_trim",
      persist: true,
      hideSelected: true,
      onChange: function(input) {
        "use strict";
      }
    });
  });

}).call(this);
