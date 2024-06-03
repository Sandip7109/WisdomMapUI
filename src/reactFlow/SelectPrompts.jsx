/* eslint-disable react/prop-types */
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectPrompts = ({ selectedCategory, onCategorySelect }) => {
  const handleChange = (event) => {
    onCategorySelect(event.target.value);
  };

  return (
    <FormControl sx={{ mb: 1, width: '100%' }}>
      <Select
        size='small'
        value={selectedCategory}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={'knowledge'}>Knowldege Explorer</MenuItem>
        <MenuItem value={'nursing'}>Nursing</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectPrompts;
