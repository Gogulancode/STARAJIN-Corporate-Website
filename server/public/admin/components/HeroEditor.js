// Hero Section Editor Component
function createHeroEditor(section, updateCallback) {
    return `
        <div class="space-y-6" x-data="heroEditor(${JSON.stringify(section).replace(/"/g, '&quot;')})">
            <!-- Configuration -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Animation</label>
                    <select x-model="config.animation" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="none">None</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Auto Play (seconds)</label>
                    <input type="number" 
                           x-model="config.autoPlay"
                           @input="updateSection()"
                           min="0"
                           max="30"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <div>
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" 
                               x-model="config.showNavigation"
                               @change="updateSection()"
                               class="rounded border-gray-300 text-starajin-blue">
                        <span class="ml-2 text-sm text-gray-700">Show Navigation</span>
                    </label>
                </div>
                <div>
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" 
                               x-model="config.showDots"
                               @change="updateSection()"
                               class="rounded border-gray-300 text-starajin-blue">
                        <span class="ml-2 text-sm text-gray-700">Show Dots</span>
                    </label>
                </div>
                <div>
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" 
                               x-model="config.parallax"
                               @change="updateSection()"
                               class="rounded border-gray-300 text-starajin-blue">
                        <span class="ml-2 text-sm text-gray-700">Parallax Effect</span>
                    </label>
                </div>
            </div>

            <!-- Hero Slides -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">Hero Slides</label>
                    <button @click="addSlide()" 
                            class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Slide
                    </button>
                </div>

                <div class="space-y-6">
                    <template x-for="(slide, slideIndex) in content.slides" :key="slideIndex">
                        <div class="border rounded-lg p-6 bg-gray-50">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="font-semibold text-gray-900 flex items-center">
                                    <span class="bg-starajin-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3" 
                                          x-text="slide.index"></span>
                                    Slide #<span x-text="slideIndex + 1"></span>
                                </h3>
                                <div class="flex items-center space-x-2">
                                    <!-- Index field -->
                                    <div class="flex items-center space-x-1">
                                        <label class="text-xs text-gray-500">Index:</label>
                                        <input type="number" 
                                               x-model="slide.index"
                                               @input="updateSection()"
                                               min="0"
                                               class="w-16 px-2 py-1 text-xs border border-gray-300 rounded">
                                    </div>
                                    
                                    <button @click="moveSlideUp(slideIndex)" :disabled="slideIndex === 0"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                        </svg>
                                    </button>
                                    <button @click="moveSlideDown(slideIndex)" :disabled="slideIndex === content.slides.length - 1"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <button @click="removeSlide(slideIndex)" 
                                            class="p-1 text-red-400 hover:text-red-600">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <!-- Content Side -->
                                <div class="space-y-4">
                                    <!-- Title -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <textarea x-model="slide.title"
                                                  @input="updateSection()"
                                                  rows="2"
                                                  placeholder="Hero slide title..."
                                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
                                    </div>

                                    <!-- Subtitle -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                        <textarea x-model="slide.subtitle"
                                                  @input="updateSection()"
                                                  rows="3"
                                                  placeholder="Hero slide subtitle or description..."
                                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
                                    </div>

                                    <!-- Content Position -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Content Position</label>
                                        <select x-model="slide.position" @change="updateSection()" 
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                            <option value="left">Left</option>
                                            <option value="center">Center</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>

                                    <!-- CTAs -->
                                    <div>
                                        <div class="flex items-center justify-between mb-3">
                                            <label class="block text-sm font-medium text-gray-700">Buttons</label>
                                            <button @click="addSlideCTA(slideIndex)" 
                                                    class="text-starajin-blue hover:text-starajin-blue/80 text-xs">
                                                + Add Button
                                            </button>
                                        </div>
                                        <div class="space-y-2">
                                            <template x-for="(cta, ctaIndex) in slide.ctas || []" :key="ctaIndex">
                                                <div class="flex items-center space-x-2">
                                                    <input type="text" 
                                                           x-model="cta.text"
                                                           @input="updateSection()"
                                                           placeholder="Button text"
                                                           class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded">
                                                    <input type="text" 
                                                           x-model="cta.href"
                                                           @input="updateSection()"
                                                           placeholder="URL"
                                                           class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded">
                                                    <select x-model="cta.style" @change="updateSection()" 
                                                            class="px-2 py-1 text-sm border border-gray-300 rounded">
                                                        <option value="primary">Primary</option>
                                                        <option value="secondary">Secondary</option>
                                                        <option value="ghost">Ghost</option>
                                                    </select>
                                                    <button @click="removeSlideCTA(slideIndex, ctaIndex)" 
                                                            class="p-1 text-red-400 hover:text-red-600">
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                                <!-- Image Side -->
                                <div x-data="imageUpload(slide.image || {})">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                                    
                                    <div x-show="!image.url" class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                        <div class="text-center">
                                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="mt-2">
                                                <button type="button" @click="uploadImage()" 
                                                        class="text-starajin-blue hover:text-starajin-blue/80 font-medium">
                                                    Upload image
                                                </button>
                                                <input type="file" @change="handleFileSelect($event)" accept="image/*" class="hidden" x-ref="fileInput">
                                            </div>
                                            <p class="text-xs text-gray-500 mt-1">Hero images work best at 1920x1080px</p>
                                        </div>
                                    </div>

                                    <div x-show="image.url" class="space-y-3">
                                        <div class="relative">
                                            <img :src="image.url" :alt="image.alt" class="w-full h-48 object-cover rounded border">
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
                                                   @input="updateSlideImage(slideIndex, image)"
                                                   placeholder="Describe the image..."
                                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                        </div>
                                        <!-- Overlay Options -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Overlay</label>
                                            <select x-model="slide.overlay" @change="updateSection()" 
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                                <option value="none">None</option>
                                                <option value="light">Light</option>
                                                <option value="dark">Dark</option>
                                                <option value="gradient">Gradient</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    `;
}

function heroEditor(initialSection) {
    return {
        content: initialSection.content || {
            slides: []
        },
        config: initialSection.config || {
            animation: 'fade',
            autoPlay: 5,
            showNavigation: true,
            showDots: true,
            parallax: false
        },

        addSlide() {
            this.content.slides.push({
                title: '',
                subtitle: '',
                position: 'center',
                image: { url: '', alt: '' },
                overlay: 'dark',
                ctas: [],
                index: this.content.slides.length
            });
            this.updateSection();
        },

        removeSlide(index) {
            this.content.slides.splice(index, 1);
            // Reindex remaining slides
            this.content.slides.forEach((slide, idx) => {
                slide.index = idx;
            });
            this.updateSection();
        },

        moveSlideUp(index) {
            if (index > 0) {
                [this.content.slides[index], this.content.slides[index - 1]] = 
                [this.content.slides[index - 1], this.content.slides[index]];
                // Update indices
                this.content.slides[index].index = index;
                this.content.slides[index - 1].index = index - 1;
                this.updateSection();
            }
        },

        moveSlideDown(index) {
            if (index < this.content.slides.length - 1) {
                [this.content.slides[index], this.content.slides[index + 1]] = 
                [this.content.slides[index + 1], this.content.slides[index]];
                // Update indices
                this.content.slides[index].index = index;
                this.content.slides[index + 1].index = index + 1;
                this.updateSection();
            }
        },

        addSlideCTA(slideIndex) {
            if (!this.content.slides[slideIndex].ctas) {
                this.content.slides[slideIndex].ctas = [];
            }
            this.content.slides[slideIndex].ctas.push({
                text: '',
                href: '',
                style: 'primary'
            });
            this.updateSection();
        },

        removeSlideCTA(slideIndex, ctaIndex) {
            this.content.slides[slideIndex].ctas.splice(ctaIndex, 1);
            this.updateSection();
        },

        updateSlideImage(slideIndex, imageData) {
            this.content.slides[slideIndex].image = imageData;
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

// Reusable image upload component for hero slides
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
