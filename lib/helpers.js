function jobj_from_maybe_string(o) {
    return typeof o === "string" ? o : o.jvm_obj;
}
module.exports = {
    jobj_from_maybe_string: jobj_from_maybe_string
};
