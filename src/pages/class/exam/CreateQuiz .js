import React, { useState } from 'react';
import { Form, Input, Checkbox, Radio, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const CreateQuiz = () => {
	const [form] = Form.useForm();
	const [answerTypes, setAnswerTypes] = useState(['single']); // 'single' or 'multiple'

	const onFinish = (values) => {
		console.log('Received values:', values);
        console.log('Answer types:', answerTypes);
	};

	const handleAnswerTypeChange = (index, e) => {
		
		const newAnswerTypes = [...answerTypes];        
        newAnswerTypes[index] = e.target.value;
        if(e.target.value === 'single'){
            newAnswerTypes[index] = 'single';
        }
        else{
            newAnswerTypes[index] = 'multiple';
        }
        setAnswerTypes(newAnswerTypes);
	};

	return (
		<Form form={form} onFinish={onFinish} layout="vertical">
			<Form.List name="questions">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, fieldKey, ...restField }, index) => (
							<Space key={key} style={{ marginBottom: 8 }} align="baseline">
								<Form.Item
									{...restField}
									name={[name, 'question']}
									rules={[{ required: true, message: 'Vui lòng nhập câu hỏi!' }]}
								>
									<Input placeholder="Nhập câu hỏi" />
								</Form.Item>
								<Form.Item name={[name, 'answerType']} valuePropName="checked">
									<Radio.Group
										onChange={(e) => handleAnswerTypeChange(index, e)}
										defaultValue={answerTypes[index] || 'single'} // Sử dụng 'single' nếu giá trị là undefined
									>
										<Radio value="single">Chọn 1 đáp án</Radio>
										<Radio value="multiple">Chọn nhiều đáp án</Radio>
									</Radio.Group>
								</Form.Item>
								<Form.List name={[name, 'answers']}>
									{(answerFields, { add: addAnswer, remove: removeAnswer }) => (
										<>
											{answerFields.map(
												(
													{
														key: answerKey,
														name: answerName,
														fieldKey: answerFieldKey,
														...answerRestField
													},
													answerIndex
												) => (
													<Space
														key={answerKey}
														style={{ display: 'flex', marginBottom: 8 }}
														align="baseline"
													>
														<Form.Item
															{...answerRestField}
															name={[answerName, 'answer']}
															rules={[
																{ required: true, message: 'Vui lòng nhập đáp án!' },
															]}
														>
															<Input placeholder="Nhập đáp án" />
														</Form.Item>

														{answerTypes[index] === 'multiple' && (
															<Form.Item
																name={[answerName, 'isCorrect']}
																valuePropName="checked"
															>
																<Checkbox>Đáp án đúng</Checkbox>
															</Form.Item>
														)}

														{answerTypes[index] === 'single' && (
															<Form.Item
																name={[answerName, 'isCorrect']}
																valuePropName="checked"
															>
																<Radio>Đáp án đúng</Radio>
															</Form.Item>
														)}
														<MinusCircleOutlined onClick={() => removeAnswer(answerName)} />
													</Space>
												)
											)}
											<Form.Item>
												<Button
													type="dashed"
													onClick={() => addAnswer()}
													icon={<PlusOutlined />}
												>
													Thêm đáp án
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>
								{index > 0 && (
									<Form.Item>
										<DeleteOutlined onClick={() =>{ remove(name);
                                        setAnswerTypes.splice(index, 1);
                                        }
                                    }/>
									</Form.Item>
								)}
							</Space>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => {
									add();
                                    setAnswerTypes([...answerTypes, 'single']);
								}}
								icon={<PlusOutlined />}
							>
								Thêm câu hỏi
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Tạo bài kiểm tra
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateQuiz;
