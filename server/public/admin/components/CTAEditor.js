// CTA Section Editor Component
function createCTAEditor(section, updateCallback) {
    return `
        <div class="space-y-6" x-data="ctaEditor(${JSON.stringify(section).replace(/"/g, '&quot;')})">
            <!-- Heading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Main Heading</label>
                <textarea x-model="content.title"
                          @input="updateSection()"
                          rows="2"
                          placeholder="Your call-to-action heading..."
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
            </div>

            <!-- Subheading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
                <textarea x-model="content.subtitle"
                          @input="updateSection()"
                          rows="3"
                          placeholder="Supporting text or description..."
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
            </div>

            <!-- Configuration -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Background Style</label>
                    <select x-model="config.background" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="primary">Primary Color</option>
                        <option value="secondary">Secondary Color</option>
                        <option value="gradient">Gradient</option>
                        <option value="image">Background Image</option>
                        <option value="white">White</option>
                        <option value="light">Light Gray</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
                    <select x-model="config.alignment" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>

            <!-- Background Image (if selected) -->
            <div x-show="config.background === 'image'" x-data="imageUpload(content.backgroundImage || {})">
                <label class="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                
                <div x-show="!image.url" class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="mt-2">
                            <button type="button" @click="uploadImage()" 
                                    class="text-starajin-blue hover:text-starajin-blue/80 font-medium">
                                Upload background image
                            </button>
                            <input type="file" @change="handleFileSelect($event)" accept="image/*" class="hidden" x-ref="fileInput">
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Best at 1920x1080px or larger</p>
                    </div>
                </div>

                <div x-show="image.url" class="space-y-3">
                    <div class="relative">
                        <img :src="image.url" :alt="image.alt" class="w-full h-32 object-cover rounded border">
                        <button @click="removeImage()" 
                                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                        <input type="text" 
                               x-model="image.alt"
                               @input="updateBackgroundImage()"
                               placeholder="Describe the background image..."
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Overlay</label>
                        <select x-model="config.overlay" @change="updateSection()" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                            <option value="none">None</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="gradient">Gradient</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">Action Buttons</label>
                    <button @click="addButton()" 
                            class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Button
                    </button>
                </div>

                <div class="space-y-4">
                    <template x-for="(button, buttonIndex) in content.buttons" :key="buttonIndex">
                        <div class="border rounded-lg p-4 bg-gray-50">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-medium text-gray-900">Button #<span x-text="buttonIndex + 1"></span></h4>
                                <div class="flex items-center space-x-2">
                                    <button @click="moveButtonUp(buttonIndex)" :disabled="buttonIndex === 0"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                        </svg>
                                    </button>
                                    <button @click="moveButtonDown(buttonIndex)" :disabled="buttonIndex === content.buttons.length - 1"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <button @click="removeButton(buttonIndex)" 
                                            class="p-1 text-red-400 hover:text-red-600">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-4">
                                <!-- Button Text -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                    <input type="text" 
                                           x-model="button.text"
                                           @input="updateSection()"
                                           placeholder="Button text..."
                                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                </div>

                                <!-- Button Configuration -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                                        <input type="text" 
                                               x-model="button.href"
                                               @input="updateSection()"
                                               placeholder="https://... or /page"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Button Style</label>
                                        <select x-model="button.style" @change="updateSection()" 
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                            <option value="primary">Primary</option>
                                            <option value="secondary">Secondary</option>
                                            <option value="outline">Outline</option>
                                            <option value="ghost">Ghost</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Button Size and Options -->
                                <div class="grid grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                        <select x-model="button.size" @change="updateSection()" 
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                            <option value="sm">Small</option>
                                            <option value="md">Medium</option>
                                            <option value="lg">Large</option>
                                            <option value="xl">Extra Large</option>
                                        </select>
                                    </div>
                                    <div class="flex items-center">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" 
                                                   x-model="button.newTab"
                                                   @change="updateSection()"
                                                   class="rounded border-gray-300 text-starajin-blue">
                                            <span class="ml-2 text-sm text-gray-700">Open in new tab</span>
                                        </label>
                                    </div>
                                    <div class="flex items-center">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" 
                                                   x-model="button.fullWidth"
                                                   @change="updateSection()"
                                                   class="rounded border-gray-300 text-starajin-blue">
                                            <span class="ml-2 text-sm text-gray-700">Full width</span>
                                        </label>
                                    </div>
                                </div>

                                <!-- Icon (optional) -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Icon (optional)</label>
                                    <div class="flex items-center space-x-2">
                                        <input type="text" 
                                               x-model="button.icon"
                                               @input="updateSection()"
                                               placeholder="Icon name (e.g., arrow-right, download)"
                                               class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                        <select x-model="button.iconPosition" @change="updateSection()" 
                                                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Additional Options -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" 
                               x-model="config.fullWidth"
                               @change="updateSection()"
                               class="rounded border-gray-300 text-starajin-blue">
                        <span class="ml-2 text-sm text-gray-700">Full width section</span>
                    </label>
                </div>
                <div>
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" 
                               x-model="config.animate"
                               @change="updateSection()"
                               class="rounded border-gray-300 text-starajin-blue">
                        <span class="ml-2 text-sm text-gray-700">Animate on scroll</span>
                    </label>
                </div>
            </div>
        </div>
    `;
}

function ctaEditor(initialSection) {
    return {
        content: initialSection.content || {
            title: '',
            subtitle: '',
            buttons: [],
            backgroundImage: { url: '', alt: '' }
        },
        config: initialSection.config || {
            background: 'primary',
            alignment: 'center',
            overlay: 'dark',
            fullWidth: true,
            animate: true
        },

        addButton() {
            this.content.buttons.push({
                text: '',
                href: '',
                style: 'primary',
                size: 'lg',
                newTab: false,
                fullWidth: false,
                icon: '',
                iconPosition: 'left'
            });
            this.updateSection();
        },

        removeButton(index) {
            this.content.buttons.splice(index, 1);
            this.updateSection();
        },

        moveButtonUp(index) {
            if (index > 0) {
                [this.content.buttons[index], this.content.buttons[index - 1]] = 
                [this.content.buttons[index - 1], this.content.buttons[index]];
                this.updateSection();
            }
        },

        moveButtonDown(index) {
            if (index < this.content.buttons.length - 1) {
                [this.content.buttons[index], this.content.buttons[index + 1]] = 
                [this.content.buttons[index + 1], this.content.buttons[index]];
                this.updateSection();
            }
        },

        updateBackgroundImage() {
            this.content.backgroundImage = this.image;
            this.updateSection();
        },

        updateSection() {
            // This would trigger a parent component update
            if (window.updateSectionCallback) {
                window.updateSectionCallback(this.content, this.config);
            }
        }
    }
}

// Reusable image upload component
function imageUpload(initialImage) {
    return {
        image: initialImage || { url: '', alt: '' },
        uploading: false,

        uploadImage() {
            this.$refs.fileInput.click();
        },

        async handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.uploading = true;
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:3004/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('cms_token')}`
                    },
                    body: formData
                });

                const result = await response.json();
                
                if (result.success) {
                    this.image = {
                        url: result.url,
                        alt: '',
                        mediaId: result.mediaId
                    };
                } else {
                    alert('Upload failed: ' + result.error);
                }
            } catch (error) {
                alert('Upload error: ' + error.message);
            } finally {
                this.uploading = false;
            }
        },

        removeImage() {
            this.image = { url: '', alt: '' };
        }
    }
}
