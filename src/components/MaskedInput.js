import LabeledInput from './LabeledInput';

export default function MaskedInput({ label, value, onChangeText, format, inputProps, ...rest }) {
  const handleChange = (text) => {
    const formatted = format ? format(text) : text;
    onChangeText(formatted);
  };

  return (
    <LabeledInput
      label={label}
      inputProps={{
        value,
        onChangeText: handleChange,
        ...inputProps,
        ...rest,
      }}
    />
  );
}